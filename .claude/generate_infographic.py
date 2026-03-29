#!/usr/bin/env python3
"""
Zoo Knowledge Vault - インフォグラフィック生成スクリプト
Gemini 2.0 Flash で記事内容からSVGインフォグラフィックを生成する

使い方:
  python generate_infographic.py <記事ファイルパス>

出力:
  _images/<記事名>_infographic.svg
"""

import sys
import os
import json
import re
import urllib.request
import urllib.error

API_KEY = "AIzaSyBc6LExLaesA3ZwDi9RtAfpydsS-hCmv7Y"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"
VAULT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES_DIR = os.path.join(VAULT_DIR, "_images")


def read_article(filepath):
    with open(filepath, encoding="utf-8") as f:
        return f.read()


def extract_frontmatter(content):
    """フロントマターからタイトルとタグを抽出"""
    title = re.search(r'^title:\s*"?([^"\n]+)"?', content, re.MULTILINE)
    tags = re.findall(r'^\s+-\s+(.+)$', content[:500], re.MULTILINE)
    return {
        "title": title.group(1).strip() if title else "記事",
        "tags": tags
    }


def generate_infographic_svg(article_content, title):
    """Gemini 2.0 Flash でSVGインフォグラフィックを生成"""
    prompt = f"""以下の記事から、動物・自然をテーマにしたインフォグラフィックのSVGコードを生成してください。

【記事タイトル】
{title}

【記事内容（先頭800字）】
{article_content[:800]}

【SVG要件】
- サイズ: width="800" height="600"
- テーマ: 自然・動物・植物（森林グリーン系カラー）
- 背景: 薄いベージュ（#faf8f5）に森・葉のシルエット装飾
- タイトルを上部に大きく表示（日本語）
- 記事の主要ポイントを3〜4つアイコン付きで表示
- アイコンは動物・植物をイメージしたシンプルな図形（SVGで描く）
- カラーパレット: #2d6a4f（森林グリーン）, #52796f（セージ）, #95d5b2（若草）, #faf8f5（ベージュ）, #2b2926（ダーク）
- フォント: sans-serif
- 右下に "Zoo Knowledge Vault" のクレジット
- 完全なSVGコードのみ出力（説明文不要）
- <svg>タグから</svg>タグまでのみ出力

"""
    body = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.7, "maxOutputTokens": 4096}
    }).encode("utf-8")

    req = urllib.request.Request(
        GEMINI_URL,
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            text = result["candidates"][0]["content"]["parts"][0]["text"]
            # SVGコードのみ抽出
            svg_match = re.search(r'<svg[\s\S]*?</svg>', text, re.DOTALL)
            return svg_match.group(0) if svg_match else text
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        print(f"API エラー {e.code}: {error_body[:200]}", file=sys.stderr)
        return None


def search_references(title, tags):
    """Gemini で参考URLを生成"""
    query = f"{title} {' '.join(tags[:3])}"
    prompt = f"""以下のトピックに関連する、実在する信頼性の高い日本語ウェブサイトのURLを5件提示してください。

トピック: {query}

【条件】
- 動物園・動物飼育・自然環境に関する公的機関・研究機関・専門団体のサイト
- 例: JAZA（日本動物園水族館協会）、環境省、国立研究開発法人、大学研究室など
- フォーマット（1行1件）:
  - [サイト名](URL): 説明

URLのみ列挙（確実に存在するURLのみ記載。不確かな場合は記載しない）
"""
    body = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.3, "maxOutputTokens": 1024}
    }).encode("utf-8")

    req = urllib.request.Request(
        GEMINI_URL,
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            return result["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        print(f"参考URL生成エラー: {e}", file=sys.stderr)
        return None


def insert_infographic_and_refs(filepath, svg_filename, references_text):
    """記事ファイルにインフォグラフィックと参考URLを挿入"""
    with open(filepath, encoding="utf-8") as f:
        content = f.read()

    # フロントマターの終端（2番目の---）を探す
    fm_end = content.find("---", 3)
    if fm_end == -1:
        insert_pos = 0
    else:
        insert_pos = fm_end + 3

    # インフォグラフィックセクションを挿入（フロントマター直後）
    infographic_section = f"""

## インフォグラフィック

![](_images/{svg_filename})

"""
    # 参考URLセクションを末尾に追加（既存の場合は置換）
    ref_section = f"""
## 参考・引用元

{references_text if references_text else "- 情報収集中"}
"""

    # インフォグラフィックをフロントマター直後に挿入
    new_content = content[:insert_pos] + infographic_section + content[insert_pos:]

    # 参考URLを末尾に追加（既存セクションがあれば置換）
    if "## 参考" in new_content or "## 情報源" in new_content:
        new_content = re.sub(r'\n## (参考|情報源)[\s\S]*$', ref_section, new_content)
    else:
        new_content = new_content.rstrip() + "\n" + ref_section

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"記事更新完了: {filepath}")


def main():
    if len(sys.argv) < 2:
        print("使い方: python generate_infographic.py <記事ファイルパス>")
        sys.exit(1)

    filepath = sys.argv[1]
    if not os.path.exists(filepath):
        print(f"ファイルが見つかりません: {filepath}", file=sys.stderr)
        sys.exit(1)

    print(f"処理中: {filepath}")

    content = read_article(filepath)
    meta = extract_frontmatter(content)
    title = meta["title"]
    tags = meta["tags"]

    print(f"タイトル: {title}")

    # 1. インフォグラフィック生成
    print("インフォグラフィック生成中...")
    svg_content = generate_infographic_svg(content, title)

    svg_filename = None
    if svg_content:
        os.makedirs(IMAGES_DIR, exist_ok=True)
        safe_name = re.sub(r'[^\w\-]', '_', title)[:40]
        svg_filename = f"{safe_name}_infographic.svg"
        svg_path = os.path.join(IMAGES_DIR, svg_filename)
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(svg_content)
        print(f"SVG保存: {svg_path}")
    else:
        print("インフォグラフィック生成失敗", file=sys.stderr)

    # 2. 参考URL収集
    print("参考URL収集中...")
    references = search_references(title, tags)
    if references:
        print(f"参考URL取得完了")

    # 3. 記事に挿入
    if svg_filename or references:
        insert_infographic_and_refs(filepath, svg_filename or "", references or "")

    print("完了")


if __name__ == "__main__":
    main()
