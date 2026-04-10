---
title: "Claude Managed Agents — Anthropic 的 Agent 托管執行平台"
date: 2026-04-10
url: https://platform.claude.com/docs/en/managed-agents/overview
note: "Anthropic 推出 Claude Managed Agents，讓開發者只需定義 Agent 做什麼，Anthropic 負責跑起來。2026-04-08 進入 public beta，$0.08/活躍執行小時，所有 API 帳號預設可用。"
---

來源：[platform.claude.com/docs/en/managed-agents/overview](https://platform.claude.com/docs/en/managed-agents/overview)

你可以在 **不搭任何基礎設施** 的情況下，讓一個 AI Agent 自主跑幾小時——讀取檔案、執行 bash 命令、搜尋網頁、呼叫 MCP server，過程中透過 SSE 串流即時回傳每一步的結果。費用是 **$0.08 / 活躍執行小時**（加上標準 token 費用）。一個 Agent 每個工作日跑 8 小時，月費約 **$14**（純執行時間，不含 token）。2026 年 4 月 8 日進入 public beta，所有 Anthropic API 帳號預設可用，只需帶上 `managed-agents-2026-04-01` beta header（SDK 自動加入）。

背後的架構圍繞四個概念：**Agent**（model + system prompt + tools + MCP servers 的可重複使用定義）、**Environment**（預裝套件的雲端容器模板）、**Session**（Agent 在 Environment 裡的一次執行實例）、**Events**（你的應用和 Agent 之間的 SSE 訊息流，event history 持久存在伺服器端）。和直接呼叫 Messages API 的差別是：Messages API 讓你掌控 agent loop 的每一步；Managed Agents 把 loop、沙盒、工具執行層全部託管——你只定義「做什麼」，不用搭「怎麼跑」。三個進階功能（Outcomes、**Multi-agent**、Memory）目前在 research preview，需要另外申請——其中 Multi-agent 讓一個協調 agent 可以同時指揮多個子 agent 並行執行（**目前只支援一層委派**，子 agent 無法再呼叫自己的 agent）。

以前：把 AI Agent 從原型推上線，工程師要自建沙盒環境、身份驗證、工具執行框架、狀態管理——光基礎設施就能耗掉幾個月，而且每個 Agent 都要從零搭。現在：同一套基礎設施由 Anthropic 托管，你只需要把 Agent 的定義寫好（模型、system prompt、工具清單），$0.08/hr 讓任何有 API key 的開發者都能在幾天內把 Agent 跑進 production。

---

## 使用方式

**Messages API vs Managed Agents — 怎麼選：**

| | Messages API | Managed Agents |
|---|---|---|
| 適合 | 需要精細控制 agent loop 的每一步 | 長時間執行、非同步、不想管基礎設施 |
| 控制粒度 | 完全掌控 | 託管，可中途介入或中斷 |

**快速開始（Python）：**

```python
import anthropic

client = anthropic.Anthropic()

# 1. 定義 Agent
agent = client.beta.agents.create(
    name="My Agent",
    model="claude-sonnet-4-6",
    system="You are a helpful assistant.",
    tools=[{"type": "bash_20250124"}, {"type": "web_search_20250305"}],
)

# 2. 配置 Environment（選擇預裝套件）
environment = client.beta.environments.create(
    name="python-env",
    packages=["python3", "nodejs"],
)

# 3. 啟動 Session
session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
)

# 4. 送出訊息，透過 SSE 串流結果
with client.beta.sessions.stream(session.id, events=[
    {"type": "user.message", "content": "請幫我分析這份報告"}
]) as stream:
    for event in stream:
        if event.type == "agent.message":
            for block in event.content:
                if block.type == "text":
                    print(block.text, end="")
```

**Multi-agent（research preview）— 協調 agent 指揮子 agent：**

```python
# 建立子 agent（專門做 code review）
reviewer = client.beta.agents.create(
    name="Code Reviewer",
    model="claude-sonnet-4-6",
    system="You perform code reviews with read-only access.",
)

# 建立協調 agent，宣告可呼叫的子 agent
orchestrator = client.beta.agents.create(
    name="Engineering Lead",
    model="claude-sonnet-4-6",
    system="You coordinate engineering work. Delegate code review to the reviewer agent.",
    tools=[{"type": "agent_toolset_20260401"}],
    callable_agents=[
        {"type": "agent", "id": reviewer.id, "version": reviewer.version}
    ],
)
# 注意：目前只支援一層委派，子 agent 無法再呼叫自己的 agent
```

**Rate limits：**
- Create 類端點（建立 agent/session/environment）：60 requests/min
- Read 類端點（讀取、列表、串流）：600 requests/min

<AnnotationCard
  relevance={5}
  skills={["ai-agents", "ai-workflow", "monorepo-pnpm"]}
  adjacent="Multi-agent Orchestration 架構設計"
  adjacentNote={"你已有 Claude_auto 的單一 agent 排程工作流 → 下一步：研究 Multi-agent research preview，把 news 生成、journal 寫作、showcase 生成拆成三個專職 Agent，由協調 Agent 統一指揮，每個 Agent 只做自己最擅長的部分。"}
  connection={"Managed Agents 的 Agent + Environment + Session 三層架構，和你在 Claude_auto 裡的 learning-context + sources + session-log 設計邏輯高度對應——你已經在設計一個手動版的 managed agent 系統，下一步是把它遷移到官方托管環境。"}
/>
