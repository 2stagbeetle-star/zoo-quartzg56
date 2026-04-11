import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Zoo Knowledge Vault - Quartz4 設定ファイル
 * 使い方:
 *   1. このファイルを ~/Documents/zoo-quartz/quartz.config.ts にコピー
 *   2. baseUrl の YOUR_GITHUB_USERNAME を実際のGitHubユーザー名に変更
 *   3. npx quartz build --serve でローカル確認
 *   4. npx quartz sync でデプロイ
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Zoo Knowledge Vault",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "ja-JP",
    baseUrl: "2stagbeetle-star.github.io/zoo-quartzg56",
    ignorePatterns: [
      "_drafts",
      "_templates",
      ".obsidian",
      ".claude"
    ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Serif JP",
        body: "Noto Sans JP",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f8f6f2",
          lightgray: "#e8e2d6",
          gray: "#8c7a68",
          darkgray: "#2c2820",
          dark: "#1a1510",
          secondary: "#2d5a27",   // 深い森緑（プライマリ）
          tertiary: "#5a7a50",    // セージグリーン
          highlight: "rgba(45, 90, 39, 0.08)",
          textHighlight: "#c8a84b44",
        },
        darkMode: {
          light: "#1a1e1c",
          lightgray: "#2e3530",
          gray: "#8a9e8a",
          darkgray: "#dde4dd",
          dark: "#e8ede8",
          secondary: "#7ab888",
          tertiary: "#9dd0a0",
          highlight: "rgba(122, 184, 136, 0.10)",
          textHighlight: "#c8a84b44",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({ priority: ["frontmatter", "filesystem"] }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
