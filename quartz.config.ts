import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

// Site-wide Quartz configuration for Zoo Knowledge Vault.
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Zoo Knowledge Vault",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "ja-JP",
    baseUrl: "2stagbeetle-star.github.io/zoo-quartzg56",
    ignorePatterns: ["_drafts", "_templates", ".obsidian", ".claude"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Shippori Mincho",
        body: "Zen Kaku Gothic New",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#000000",
          lightgray: "#26344a",
          gray: "#000000",
          darkgray: "#000000",
          dark: "#000000",
          secondary: "#000000",
          tertiary: "#000000",
          highlight: "rgba(0, 0, 0, 0.08)",
          textHighlight: "rgba(0, 0, 0, 0.16)",
        },
        darkMode: {
          light: "#000000",
          lightgray: "#1f2a3d",
          gray: "#000000",
          darkgray: "#000000",
          dark: "#000000",
          secondary: "#000000",
          tertiary: "#000000",
          highlight: "rgba(0, 0, 0, 0.08)",
          textHighlight: "rgba(0, 0, 0, 0.16)",
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
