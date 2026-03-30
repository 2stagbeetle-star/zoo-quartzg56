import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "無題",
    description: "説明なし",
  },
  components: {
    callout: {
      note: "ノート",
      abstract: "抄録",
      info: "情報",
      todo: "やるべきこと",
      tip: "ヒント",
      success: "成功",
      question: "質問",
      warning: "警告",
      failure: "失敗",
      danger: "危険",
      bug: "バグ",
      example: "例",
      quote: "引用",
    },
    backlinks: {
      title: "関連記事",
      noBacklinksFound: "関連記事はありません",
    },
    themeToggle: {
      lightMode: "ライトモード",
      darkMode: "ダークモード",
    },
    readerMode: {
      title: "リーダーモード",
    },
    explorer: {
      title: "カテゴリ一覧",
    },
    footer: {
      createdWith: "開発",
    },
    graph: {
      title: "関連テーマ",
    },
    recentNotes: {
      title: "新着記事",
      seeRemainingMore: ({ remaining }) => `さらに${remaining}件 →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `${targetSlug}のまとめ`,
      linkToOriginal: "元記事へのリンク",
    },
    search: {
      title: "検索",
      searchBarPlaceholder: "記事・キーワードを検索",
    },
    tableOfContents: {
      title: "目次",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `約${minutes}分で読めます`,
      lastUpdated: "最終更新",
      published: "公開日",
    },
  },
  pages: {
    rss: {
      recentNotes: "新着記事",
      lastFewNotes: ({ count }) => `最新の${count}件`,
    },
    error: {
      title: "ページが見つかりません",
      notFound: "ページが存在しないか、非公開設定になっています。",
      home: "ホームに戻る",
    },
    folderContent: {
      folder: "カテゴリ",
      itemsUnderFolder: ({ count }) => `${count}件の記事`,
    },
    tagContent: {
      tag: "タグ",
      tagIndex: "人気タグ",
      itemsUnderTag: ({ count }) => `${count}件の記事`,
      showingFirst: ({ count }) => `のうち最初の${count}件を表示`,
      totalTags: ({ count }) => `全${count}個のタグ`,
    },
  },
} as const satisfies Translation
