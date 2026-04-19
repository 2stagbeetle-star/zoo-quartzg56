import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.PageTitle()],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/2stagbeetle-star/zoo-quartzg56",
      Home: "https://2stagbeetle-star.github.io/zoo-quartzg56/",
    },
  }),
}

const explorerOpts = {
  title: "Category",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapFn: (node: any) => {
    node.displayName = node.displayName.replace(/^\d+_/, "")
  },
}

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
  right: [Component.DesktopOnly(Component.TableOfContents()), Component.Backlinks()],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [{ Component: Component.Search(), grow: true }, { Component: Component.Darkmode() }],
    }),
    Component.Explorer(explorerOpts),
  ],
  right: [],
}
