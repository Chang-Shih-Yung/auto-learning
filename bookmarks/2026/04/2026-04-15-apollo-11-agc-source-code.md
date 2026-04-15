---
title: "NASA 公開 Apollo 11 AGC 引導電腦原始碼"
date: 2026-04-15
url: https://github.com/chrislgarry/Apollo-11?tab=readme-ov-file
note: "4KB RAM、74KB ROM、2800顆NOR Gate 完成登月任務。優先調度、Graceful Failure 等領先時代的架構概念，原始碼含工程師幽默註解。"
---

來源：[github.com/chrislgarry/Apollo-11](https://github.com/chrislgarry/Apollo-11?tab=readme-ov-file)
模擬器：[github.com/virtualagc/virtualagc](https://github.com/virtualagc/virtualagc)

你可以在 GitHub 上直接讀到 1969 年讓人類踏上月球的那份程式碼——72KB 的 Assembly，涵蓋指揮艙（Comanche055）與登月艙（Luminary099）兩套系統，目前已有 66,400 顆星。搭配 Virtual AGC 模擬器（3,000+ stars、Docker 一鍵啟動），你可以在自己的 MacBook 上執行完全相同的登月軟體，看著 DSKY 鍵盤介面回應你的輸入，體驗 1202 警報的觸發條件。

背後靠的是一套極端資源約束下誕生的軟體架構。AGC 只有 4KB 磁芯 RAM（約 2,048 個 16-bit word）和 74KB Core Rope ROM，時脈 1.024MHz，每秒能執行約 85,000 條指令——比現在任何一顆藍芽耳機的 MCU 都弱。但 Margaret Hamilton 帶領的 MIT 團隊在這 72KB 裡塞進了優先調度器（Priority Scheduling）：登月艙接近月面時雷達資料過載、RAM 耗盡，系統自動拋棄低優先任務、只保住引擎控制與導航，並自動重啟——這就是著名的 1202 警報沒有中止任務的原因。這個「Graceful Failure」模式比 Unix 搶佔式多工早了近十年。

以前這份程式碼散落在 MIT Museum 的掃描圖檔裡，只有航太史學家會翻閱。現在它以 Public Domain 形式上架 GitHub，任何前端工程師都可以 `git clone` 下來，搜尋 `BURN_BABY_BURN` 那行點火註解，或者找到那段只用 30 行 Assembly 寫成的正弦餘弦函式，看看在沒有浮點單元、沒有數學函式庫的年代，工程師怎麼用純整數運算逼近三角函式到足夠精度。現代開發者動輒為了 bundle size 多 2KB 而煩惱，但 60 年前有人在 72KB 裡完成了整個登月任務的導航、控制與容錯——風扇不需要轉，資料不需要上雲。

<AnnotationCard
  relevance={3}
  skills={["ci-cd", "ai-workflow"]}
  adjacent="Constraint-Driven Architecture"
  adjacentNote={"你習慣在設計系統的 token 限制與 bundle budget 下找最佳解——研究 AGC 的 Priority Scheduling 原始碼，可以直接看到現代 Web Worker 優先權與 React Concurrent Mode 的概念雛形，值得深挖。"}
  connection={"你的前端工作也常面對資源上限（render budget、bundle size、context window）——AGC 工程師在 72KB 裡完成登月的思維，是效能優化心法的極端版本：先定義什麼不能丟，再決定丟什麼。"}
/>
