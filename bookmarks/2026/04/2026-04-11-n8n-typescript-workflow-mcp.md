---
title: "n8n：183K stars 的 TypeScript 工作流平台，現在原生支援 MCP"
date: 2026-04-11
url: https://github.com/n8n-io/n8n
note: "對自動化工作流很重要，特別是 MCP 原生支援讓 Claude 可以直接串接 400+ 服務"
---

來源：[github.com/n8n-io/n8n](https://github.com/n8n-io/n8n)

你可以用 n8n 把 Claude 接到 400+ 個服務——GitHub、Slack、Linear、資料庫、任何 REST API——在瀏覽器裡拖拉節點就能完成自動化流程，不用寫一行 glue code。用 `npx n8n` 一個指令就能在本機跑起來，或用 Docker self-host，資料完全不離開你的伺服器。183,489 GitHub stars、56,663 forks、900+ 預建模板，是目前最熱的開源 workflow automation 平台。

技術核心是 TypeScript visual node graph，每個節點代表一個整合或操作。n8n 同時支援兩種 MCP 角色：**MCP Client Tool 節點**讓你的 n8n workflow 呼叫外部 MCP server（例如直接呼叫 Claude Code 工具集）；**MCP Server Trigger 節點**則把整條 n8n workflow 暴露成一個 MCP server，讓 Claude 或其他 MCP client 可以把這條 workflow 當成工具呼叫。需要 n8n v1.88.0+，使用 HTTP Streamable 協定（SSE 已棄用）。

以前要讓 Claude 自動發 GitHub PR、通知 Slack、更新 Linear ticket，你得分別寫三個 API 整合、處理 auth、處理 error retry——每個新的整合點都是維護負擔。現在 n8n 把所有 integration 打包好，Claude 透過 MCP 直接呼叫，整條鏈在你的機器上跑，你的工作流程從「寫 glue code」變成「拖拉節點」。

---

## 使用方式

### 快速啟動（本機）

```bash
# 一鍵啟動，瀏覽器開 http://localhost:5678
npx n8n
```

### Self-host with Docker

```bash
docker volume create n8n_data
docker run -it --rm --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```

### 把 n8n 當成 MCP Server（給 Claude 呼叫）

1. 在 n8n 建立新 workflow，加入 **MCP Server Trigger** 節點
2. 這個 trigger 會產生一個 HTTP Streamable endpoint URL
3. 把這個 URL 加進 Claude Code 的 MCP 設定（`~/.claude/settings.json`）：

```json
{
  "mcpServers": {
    "n8n": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://localhost:5678/mcp/<your-trigger-path>"]
    }
  }
}
```

4. 之後在 Claude 裡就能直接呼叫你的 n8n workflow 當工具用

### 在 n8n 裡呼叫外部 MCP Server（Claude 工具）

1. 在 workflow 裡加入 **AI Agent** 節點
2. 在 Agent 下掛 **MCP Client Tool** 子節點
3. 填入外部 MCP server 的 HTTP Streamable endpoint
4. Agent 就能透過這個節點呼叫外部工具（例如 Figma MCP、GitHub MCP）

### 核心 MCP 節點對照

| 節點 | 角色 | 用途 |
|------|------|------|
| MCP Server Trigger | n8n 作為 Server | 把 workflow 暴露給 Claude 當工具用 |
| MCP Client Tool | n8n 作為 Client | 在 workflow 裡呼叫外部 MCP server |

### 相關資源

- 文件：https://docs.n8n.io
- MCP Server 設定：https://docs.n8n.io/advanced-ai/accessing-n8n-mcp-server/
- MCP Client 節點文件：https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp/
- 社群模板：https://n8n.io/workflows/3770-build-your-own-n8n-workflows-mcp-server/

<AnnotationCard
  relevance={5}
  skills={["ai-workflow", "ai-agents", "typescript"]}
  adjacent="n8n MCP Server Trigger + Nexus CLI node"
  adjacentNote={"你已經在做 MCP Server——下一步可以把 Nexus 的 CLI 工具（npx @nexus/cli add）包成 n8n 的 custom node，讓任何人都能透過 n8n 拖拉方式調用你的設計系統；或用 MCP Server Trigger 把整條設計 token 同步 workflow 暴露給 Claude 直接呼叫。"}
  connection={"你每天用 Claude Code 排程任務做自動化，n8n 的 MCP 雙向整合讓這條鏈路往下延伸——Claude 排程任務可以呼叫 n8n workflow，n8n workflow 再觸發 400+ 個下游服務，整個自動化系統不需要你寫任何 API 整合代碼。"}
/>
