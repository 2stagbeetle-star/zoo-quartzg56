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
          light: "#faf8f5",
          lightgray: "#e8e4df",
          gray: "#8a8580",
          darkgray: "#4a4540",
          dark: "#2b2926",
          secondary: "#2d6a4f",   // 森林グリーン（メインカラー）
          tertiary: "#52796f",    // セージグリーン
          highlight: "rgba(45, 106, 79, 0.12)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#1a1e1c",
          lightgray: "#2d3330",
          gray: "#6b7d75",
          darkgray: "#c8d5cf",
          dark: "#e8f0ec",
          secondary: "#74c69d",
          tertiary: "#95d5b2",
          highlight: "rgba(116, 198, 157, 0.12)",
          textHighlight: "#b3aa0288",
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
