---
title: "Windows 本地 AI Agent 組裝指南：Claw Code + Gemma 4 26B-A4B on RTX 4060"
date: 2026-04-07
url: ""
note: "整合兩篇 bookmark：在家用 Windows 16GB RAM + RTX 4060 跑 Claw Code（開源 Claude Code harness）+ Gemma 4 26B-A4B（本地模型），目標零 API 成本的 coding agent"
---

你想組的是一個零 API 成本的本地 AI coding agent：**Claw Code**（開源 agent 外殼）接上 **Gemma 4 26B-A4B**（本地推論模型），全部跑在你的 Windows 上。這在技術上可行，但先確認一個關鍵數字：RTX 4060 是 **8GB VRAM**，不是 16GB（16GB 是系統記憶體）。26B-A4B 的 Q4 量化版約 15–16GB，放不進 8GB VRAM，Ollama 會自動啟用 GPU+CPU 分拆模式——約 8GB 進顯卡、剩下 7–8GB 用你的系統 RAM 補。代價是速度從 DGX Spark 的 50 t/s 掉到 **5–10 t/s**。在 Claw Code 的 agentic loop 裡，每一次工具呼叫都要等模型回應——一個 300 token 的回答要等 30–60 秒，一個 15 步驟的 coding 任務可能要花 10–20 分鐘等模型推論。這不是不能用，但你要先接受這個速度。另一個問題：Claw Code 有已知的 **Windows 原生路徑 bug**，建議透過 WSL2 跑，不要在 PowerShell 裡直接用。

這個組合的技術鏈：Ollama 在 Windows 原生跑（享受完整 GPU 加速），Claw Code 在 WSL2 環境裡跑（繞過路徑 bug），WSL2 透過 Windows 主機 IP 連到 Ollama。Gemma 4 26B-A4B 是 Mixture of Experts 架構——雖然有 260 億個參數，每次推論**只激活約 38 億個**，這是它能塞進 16GB 記憶體（8GB VRAM + 8GB RAM）的原因，也是它比同尺寸 dense 模型省電的原因。Claw Code 的 Rust binary 本身啟動極快，它的角色是 agent 外殼：讀取你的 codebase → 把任務和 context 打包 → 呼叫 Ollama API（OpenAI 相容格式） → 收到回應後執行 file/shell 工具 → 循環直到任務完成。這個 loop 每一輪都是一次 LLM 呼叫，所以 5–10 t/s 的速度直接決定你等待的感受。

這件事改變了什麼：六個月前在地端跑一個能自主操作 codebase 的 AI agent，需要 A100 等級硬體。現在的路徑是：RTX 4060（消費級顯卡）+ 16GB 系統 RAM + Ollama + Claw Code，理論上就能組出一個不需要任何 API 費用的 coding agent。品質和速度都無法和 Claude Code + Sonnet 4.6 相比，但「零成本、可離線、架構完全可控」的組合在六個月前根本不存在。最適合的場景不是日常開發替代品，而是：離線環境、不想送程式碼到雲端的保密專案、或純粹學習 agentic 架構怎麼運作。

---

## 組裝指南：Claw Code + Gemma 4 26B-A4B on Windows

### 架構總覽

```
WSL2 (Ubuntu)
└── Claw Code (Rust binary)
      └── HTTP → Windows 主機 IP:11434
                  └── Ollama (Windows 原生)
                        └── gemma4:26b (GPU+CPU split)
                              ├── RTX 4060 8GB VRAM
                              └── 系統 RAM 7-8GB
```

---

### Step 1：Windows — 安裝 Ollama 並拉 26B 模型

```powershell
# 安裝 Ollama（Windows 原生，GPU 加速最完整）
winget install Ollama.Ollama

# 拉 26B-A4B 4-bit 量化版（~15GB，下載需要一段時間）
ollama pull gemma4:26b

# 確認模型跑起來、看速度（應該會看到 5-10 t/s）
ollama run gemma4:26b
# 輸入：hello, respond in 50 words
# Ctrl+D 結束

# 讓 Ollama 接受外部連線（WSL2 會從不同 IP 過來）
# 在 Windows 系統環境變數加入：
# OLLAMA_HOST=0.0.0.0:11434
# 然後重啟 Ollama
```

**記憶體使用預估（跑 26B 時）：**

| 資源 | 使用量 | 剩餘 |
|------|--------|------|
| RTX 4060 VRAM | ~7.5 GB / 8 GB | ~0.5 GB |
| 系統 RAM（模型） | ~7 GB / 16 GB | ~9 GB |
| 系統 RAM（OS + 其他） | ~3–4 GB | ~5–6 GB |

> 跑 26B 時建議關閉其他吃 RAM 的程式（瀏覽器多分頁、Docker 等）。

---

### Step 2：WSL2 — 安裝 Rust + 建置 Claw Code

```bash
# 在 WSL2 Ubuntu 終端機執行

# 安裝 Rust toolchain（如果還沒有）
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"

# Clone Claw Code
git clone https://github.com/ultraworkers/claw-code.git
cd claw-code/rust

# 建置（第一次需要幾分鐘，Rust 會編譯所有依賴）
cargo build --workspace

# 確認 binary 存在
ls ./target/debug/claw
```

---

### Step 3：WSL2 → 連接到 Windows Ollama

```bash
# 取得 Windows 主機 IP（從 WSL2 看出去）
WINDOWS_HOST=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}')
echo $WINDOWS_HOST  # 通常是 172.x.x.x

# 測試連線
curl http://$WINDOWS_HOST:11434/api/tags
# 應該會看到 gemma4:26b 在列表裡

# 設定環境變數讓 Claw Code 知道要去哪裡找 Ollama
export OLLAMA_HOST=http://$WINDOWS_HOST:11434

# 把這行加進 ~/.bashrc 讓它每次開 WSL2 自動設定
echo "export OLLAMA_HOST=http://$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):11434" >> ~/.bashrc
```

---

### Step 4：設定 Claw Code 使用 Ollama + Gemma 4

```bash
cd claw-code/rust

# 方法 A：透過環境變數指定模型（Ollama 用 OpenAI 相容 API）
export ANTHROPIC_BASE_URL=http://$WINDOWS_HOST:11434/v1
export ANTHROPIC_API_KEY=ollama  # Ollama 不驗證 key，填任意值

# 執行，指定模型名稱
./target/debug/claw prompt "list the files in this directory" \
  --model gemma4:26b

# 方法 B：用 claw login 設定（查閱 claw-code 文件，設定可能因版本而異）
./target/debug/claw doctor  # 先跑健康檢查確認設定正確
```

> ⚠️ Claw Code + 非 Anthropic 模型的整合仍在開發中，設定方式可能隨版本更新而變。跑 `./target/debug/claw --help` 查看最新選項。

---

### 速度預期 vs 選擇建議

| 模型 | t/s 估計 | 每次工具呼叫等待 | 15 步驟任務 |
|------|---------|---------------|------------|
| **26B-A4B（你的選擇）** | 5–10 t/s | 30–60 秒 | 10–20 分鐘 |
| **E4B（速度優先）** | 25–30 t/s | 7–12 秒 | 2–4 分鐘 |
| Claude Code + Sonnet 4.6 | ~100 t/s | 2–5 秒 | 30–90 秒 |

**26B 適合的任務：** 單次深度分析、一個清晰目標的 coding 任務（你願意等）
**E4B 適合的任務：** 快速迭代、多輪對話、不確定任務方向時的探索

---

### 風險一覽

| 風險 | 等級 | 對你的影響 |
|------|------|-----------|
| Claw Code 法律風險（洩漏源碼起源） | ⚠️ 高 | repo 可能消失，個人學習用問題不大 |
| 速度（5–10 t/s） | ⚠️ 高 | agentic loop 很慢，需要耐心 |
| Claw Code 功能缺口（無 MCP、無 subagents） | ⚠️ 中 | 複雜任務失敗率高 |
| WSL2 設定複雜度 | ⚠️ 中 | 需要一個下午的設定時間 |
| RAM 壓力（26B split mode） | ⚠️ 中 | 跑模型時關掉其他吃記憶體的應用 |
| 模型推論品質 | ✅ 可接受 | 26B MoE 品質比 E4B 強，agent 任務 ~60–70% 成功率 |

<AnnotationCard
  relevance={4}
  skills={["ai-agents", "ai-workflow", "containers"]}
  adjacent="Docker 封裝整個 Claw Code + Ollama stack"
  adjacentNote={"你正在學 containers/Docker——這個 stack 是很好的 Docker 練習場景：把 Ollama + Claw Code 打包成 docker-compose，一鍵啟動整個本地 agent 環境，不再需要每次手動設定 WSL2 + 環境變數 + 路徑問題。這也直接對應你想讓 Nexus copilot-sdk 呼叫本地 AI 的目標。"}
  connection={"你的 MES 戰情室設計要求低延遲高可靠——這個 Claw Code + 26B 的實驗是同一個問題的個人規模版：把關鍵 AI 推論移到不依賴外部服務的環境。速度是目前最大的瓶頸，但對於不趕時間的離線分析任務（例如 code review 一個大 PR）是完全可行的。"}
/>
