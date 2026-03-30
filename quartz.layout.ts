import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// すべてのページで共通のコンポーネント
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/2stagbeetle-star/zoo-quartzg56",
      "このサイトについて": "https://2stagbeetle-star.github.io/zoo-quartzg56/",
    },
  }),
}

// Explorer の共通オプション（番号除去 + 日本語タイトル）
const explorerOpts = {
  title: "カテゴリ一覧",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapFn: (node: any) => {
    node.displayName = node.displayName.replace(/^\d+_/, "")
  },
}

// 記事ページのレイアウト
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(explorerOpts),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// フォルダ・タグ一覧ページのレイアウト
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(explorerOpts),
  ],
  right: [],
}
