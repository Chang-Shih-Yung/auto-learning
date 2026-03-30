---
title: "VS Code 1.112 — 整合式瀏覽器偵錯正式登場"
date: 2026-03-29
url: https://code.visualstudio.com/updates/v1_112
note: "integrated browser debug、Copilot CLI autopilot、MCP sandboxing"
---

來源：[code.visualstudio.com/updates/v1_112](https://code.visualstudio.com/updates/v1_112?fbclid=IwdGRjcAQ0lrpleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAo2NjI4NTY4Mzc5AAEeWq5CAp8Ve5DEDeozibYwo3MOdmUwrTSzBVrNmEJixxMYjp2RN6vkS8PuUsc_aem_WJVD0i6v8_IGBI0sDu0Pcw#_debug-web-apps-with-the-integrated-browser)

把 `launch.json` 裡的 `type` 從 `chrome` 改成 `editor-browser`，你就能在 VS Code 內建瀏覽器直接下中斷點、逐步執行、檢查變數，完全不需要切到外部 Chrome DevTools。這次同版本還帶來三個獨立升級：Copilot CLI 新增 Autopilot 模式、本地 MCP server 沙盒化、以及 monorepo 子資料夾現在也能自動讀到上層 repo 的 copilot-instructions.md。整包遷移成本趨近於 0——原本的 msedge/chrome 所有設定選項幾乎全部相容。

整合式瀏覽器偵錯的技術核心是新增了 `editor-browser` debug adapter，它橋接 VS Code 的 Debug Protocol 與內建 Chromium WebView。當你用 Launch 模式啟動，VS Code 同時開啟頁面與 debug session；用 Attach 模式，則連到已開啟的 tab。截圖輸出現在也掛進 chat 回應，讓 AI agent 能直接以圖片作為 context 繼續推理——二進位檔案則以 hexdump 格式傳入。MCP 沙盒化（macOS/Linux）在 `mcp.json` 加一行 `"sandboxEnabled": true`，之後每次 MCP server 嘗試存取新路徑或網域時，VS Code 會彈出授權確認並自動更新沙盒設定。

**Before**：開 Chrome DevTools 偵錯 → 切回 VS Code 改程式碼 → 重新整理 → 再切回 DevTools，每次中斷點都是一次 context switch。**After**：整個 dev loop 都在 VS Code 裡閉環，AI agent 可以截圖 → 分析 UI → 修程式碼 → 重新偵錯，全部在同一個工具鏈內完成，人類工程師只需要審查 agent 的決策，不再親自踩每一步。

<AnnotationCard
  relevance={4}
  skills={["angular", "react", "ai-workflow"]}
  adjacent="Copilot CLI Autopilot 模式"
  adjacentNote={"Copilot CLI 加入三級權限：Default、Bypass Approvals、Autopilot，最高階可自動核准所有 tool call 並持續執行直到任務完成，幾乎不需要人工確認。"}
  connection={"整合式瀏覽器偵錯讓 VS Code 成為完整 web dev 閉環環境；Autopilot 讓 agent 能在這個閉環裡自主迭代——兩個功能組合起來，代表未來大量 debug 工作可以直接委派給 agent，工程師的角色從「執行者」移向「審核者」。"}
/>
