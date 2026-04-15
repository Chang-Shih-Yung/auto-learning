---
title: "dotLLM：一個人、兩個月、從零打造 .NET 原生 LLM 推理引擎"
date: 2026-04-15
url: https://kokosa.dev/blog/2026/dotllm/
note: "Konrad Kokosa（《Pro .NET Memory Management》作者）用 C#/.NET 10 從零打造 dotLLM：GGUF 載入、SIMD CPU、CUDA GPU、OpenAI 相容 API 全齊。最猛的不是技術，是他怎麼用 AI 做工程：60 步 ROADMAP.md、180+ 條 CLAUDE.md 規則、22 份設計文件、6 個自訂 Claude Code skills，Claude/Codex/Gemini 分工實作與 review。"
---

來源：[kokosa.dev/blog/2026/dotllm](https://kokosa.dev/blog/2026/dotllm/)
專案站：[dotllm.dev](https://dotllm.dev/)
GitHub：[github.com/kkokosa/dotLLM](https://github.com/kkokosa/dotLLM)

你可以用純 C# 在本地端跑 Llama、Mistral、Phi、Qwen，不需要 Python、不需要 llama.cpp wrapper，啟動時間 Native AOT 約 50ms、JIT 約 500ms，熱推理路徑零 GC allocations。CPU decode 在 AMD Ryzen 9 5950X 上跑出 llama.cpp 的 66–88% 吞吐量（SmolLM-135M 達 279 tok/s），CUDA 後端走 PTX kernel、支援 CPU/GPU hybrid layer splitting；API 完全 OpenAI 相容，現有工具鏈直接接上不用改。整套系統由一個人，花了兩個月完成。

這件事之所以成立，不是因為 AI 很強，是因為 Konrad Kokosa 把「讓 AI 工作」這件事，做成了一套工程流程。他先把專案拆成 ~60 個步驟寫進 ROADMAP.md，每步有範圍、有依賴、有驗收條件；寫了 180+ 條編碼規則進 CLAUDE.md；產出 22 份子系統設計文件；再打造 6 個自訂 Claude Code skills（`/plan-step`、`/create-pr`、`/apply-pr-comments` 等）自動化整個開發生命週期。Claude Opus 4.6 負責實作，Codex 與 Gemini 作為獨立 PR reviewer——ring-buffer indexing 錯誤、cache collision、race condition，都在這個流程裡被捕獲。他的總結只有一句：*「你花在替 AI 寫結構化文件的時間，不是 overhead——那本身就是開發方法論。」*

以前「一個人做一個完整 inference engine」是不現實的命題，不是因為一個人不夠聰明，而是因為每個子系統都需要時間——tokenizer、attention、quantization、CUDA kernel、API server，全部加起來要以年計。現在這個邊界被打破了：前提不是你讓 AI 隨機生成程式碼，而是你能把問題拆得夠細、文件寫得夠準、驗收條件定得夠清楚。AI 不會取代軟體工程，只會把真正懂架構的人，放大到讓人害怕的程度。

<AnnotationCard
  relevance={5}
  skills={["ai-workflow", "ci-cd"]}
  adjacent="Claude Code Custom Skills Engineering"
  adjacentNote={"你已經在用 CLAUDE.md + scheduled task 管理你的 learning hub——下一步可以參考 Kokosa 的做法，把重複性的 session 操作（fetch → filter → write → commit）封裝成自訂 Claude Code skill，讓每個步驟都有明確的輸入、輸出與驗收標準。"}
  connection={"你的 learning-context.md 工作流本質上就是同一套方法論的縮小版：把工作拆步驟、寫進文件、讓 AI 按流程執行——Kokosa 把這件事放大到一個完整軟體產品的規模，值得逐步對照你自己的 memory/ 架構。"}
/>
