import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Henry's Learning Hub",
  description: "每日 AI 技術摘要 × 前端成長日誌",
  lang: 'zh-TW',

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    logo: '📚',

    nav: [
      { text: '首頁', link: '/' },
      { text: '學習日誌', link: '/學習日誌/' },
      { text: '成果展示', link: '/成果展示/' },
    ],

    sidebar: {
      '/學習日誌/': [
        {
          text: '2026',
          collapsed: false,
          items: [
            {
              text: '三月',
              collapsed: false,
              items: [
                { text: '2026-03-25 Long-running Agent × UI.SH', link: '/學習日誌/2026/03/2026-03-25' }
              ]
            }
          ]
        }
      ],
      '/成果展示/': [
        {
          text: '成果展示',
          items: [
            { text: '說明', link: '/成果展示/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/itts' }
    ],

    footer: {
      message: 'by Claude Code × Henry',
      copyright: '持續更新中'
    },

    search: {
      provider: 'local'
    },

    // 手機優化
    outline: {
      label: '本頁目錄',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最後更新',
    }
  }
})
