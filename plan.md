# 実装計画書 (plan.md)

本ドキュメントは、iOS 9対応 プライベートGeminiチャットアプリの開発タスクを、エンジニア（Jules）が段階的かつ効率的に実装できるように細分化した計画書です。

---

## ステップ 1: プロジェクトの初期化と設定ファイル構築
1. **`package.json` の作成**
   - Node.js / Cloudflare Wrangler 用の依存関係およびスクリプトを設定。
2. **`wrangler.jsonc` の作成**
   - Cloudflare Workers のエントリーポイント設定、D1 データベース (`DB`) バインディング定義。
3. **`.gitignore` の作成**
   - `node_modules`, `.dev.vars`, `.wrangler` 等の不要ファイルを排除。

---

## ステップ 2: データベース (Cloudflare D1) スキーマ設計
1. **`schema.sql` の作成**
   - **`sessions` テーブル**: 会話セッションID、タイトル、システムプロンプト、作成日時の定義。
   - **`messages` テーブル**: メッセージID、紐づくセッションID、役割 (`user` / `model`)、テキスト本文、送受信日時の定義。

---

## ステップ 3: バックエンド Core 機能の実装 (`src/index.js`)
1. **Basic 認証ミドルウェアの実装**
   - HTTP Header の `Authorization: Basic ...` を検証し、未認証の場合は `401 Unauthorized` (`WWW-Authenticate`) を返却。
2. **D1 データベース操作 API エンドポイントの実装**
   - `GET /api/sessions`: 全セッション一覧を取得。
   - `POST /api/sessions`: 新規セッション（タイトル、システムプロンプト）を作成。
   - `DELETE /api/sessions/:id`: セッションおよび関連メッセージを一括削除。
   - `GET /api/sessions/:id/messages`: 該当セッションのメッセージ履歴を取得。
3. **Google AI Studio (Gemini 2.5 Flash) API 連携の実装**
   - `POST /api/sessions/:id/messages`: ユーザーの入力を受け取り DB に保存、過去の会話履歴および `system_instruction` を構築して Gemini API にリクエストを送信。返答された AI メッセージを DB に保存してレスポンスを返却。

---

## ステップ 4: iOS 9 互換フロントエンド UI/ロジックの実装
1. **ES5 準拠 JavaScript & `XMLHttpRequest` 通信の実装**
   - `const`, `let`, 矢印関数, `async/await`, `fetch` を使用せず、`var` と `XMLHttpRequest` による非同期通信ロジックを構築。
2. **2カラム・リキッドレイアウト (CSS) の構築**
   - Flexbox / CSS Grid を使用せず、パーセント幅と `float` を用いた左右 2 カラム構造（サイドバー 30%、メイン領域 70%）を作成。
3. **新規会話作成モーダル & システムプロンプト設定機能**
   - モーダルダイアログによるタイトル・システムプロンプトの入力 UI および送信処理を実装。

---

## ステップ 5: 動作検証およびコード品質チェック
1. **構文・文法チェック (Syntax Validation)**
   - `node -c src/index.js` 等により、構文エラーがないことを検証。
2. **ES5 互換性および要件の確認**
   - フロントエンドコード内で ES6 以上の構文（`const`/`let`/`=>`等）が不意に混入していないか目視および静的解析で確認。
3. **日本語コメント・ドキュメントの確認**
   - `AGENTS.md` の規定に従い、モジュールおよび関数ヘッダーに日本語コメントが適切に記述されているか確認。

---

## ステップ 6: 完了とリポジトリ提出
1. **Pre-commit チェックスキャン**
   - 規定のテスト・振り返りチェックを実施。
2. **変更のコミット & プッシュ**
   - 分かりやすいコミットメッセージを添えて修正を送信。
