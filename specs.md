# 仕様書：iOS 9対応 プライベートGeminiチャットアプリ (specs.md)

## 1. 概要
本システムは、セキュリティ、コストパフォーマンス、および超旧型デバイス（iOS 9）への互換性を極限まで高めた、個人利用向けのプライベートAIチャットアプリケーションです。CloudflareのエコシステムとGoogle AI Studioの無料枠をフル活用し、完全無料で維持可能なサーバーレス構成を実現します。

## 2. システム構成・アーキテクチャ
*   **フロントエンド（画面）**: Cloudflare Workerから直接配信されるHTML/CSS/JavaScript（1ファイル構造）。
*   **バックエンド（処理）**: Cloudflare Workers (JavaScript/ES Modules)。
*   **データベース（永続化）**: Cloudflare D1 (サーバーレスSQLite)。
*   **AIモデル**: Google AI Studio (Gemini 2.5 Flash)。

## 3. 主要機能要件

### 3.1. デバイス互換性 (iOS 9 レガシー対応)
*   **JavaScript制限**: ES5準拠。`const`, `let`, `=>` (矢印関数), `async/await`, `fetch` APIなど、2015年以降のモダン構文を一切使用せず、`var` と `XMLHttpRequest` を使用する。
*   **CSS制限**: 最新のFlexboxやGridを使用せず、パーセント幅と `float` を用いたリキッドレイアウトで左右2カラム（履歴とチャット画面）を構築する。

### 3.2. セキュリティ・認証
*   **インフラ側認証（Basic認証）**: 認証が成功するまでHTMLの1文字すらブラウザにダウンロードさせない強固なブロック構造。端末のブラウザ標準のポップアップ機能を使用するため、レガシー端末でも確実に動作し、デバイス間の同期も不要。
*   **認証情報の秘匿**: 
    *   Basic認証のユーザー名/パスワードはWorkerのバックエンドロジック内で検証。
    *   Gemini APIキーなどの機密情報は、コード内にハードコードせず、**Cloudflare Workersの「Secrets（暗号化環境変数）」**に安全に保管し、`env.GEMINI_API_KEY` として呼び出す。

### 3.3. 会話管理 & システムプロンプト設定
*   **新規会話（セッション作成）**: 画面上のボタンからポップアップ（設定画面）を開き、新しい会話スレッドを開始できる。
*   **システムプロンプト設定**: 会話の新規作成時に、そのスレッド専用の「AIのキャラクターや役割（システムプロンプト）」を任意で設定・保存できる。
*   **端末をまたいだ履歴同期**: 会話履歴およびシステムプロンプトはすべてCloudflare D1（クラウドデータベース）に保存されるため、古いiPhone、新しいスマホ、PCなど、どの端末からアクセスしても自動的に同じ履歴が共有・同期される。

## 4. データベース設計（D1テーブル構造）

### 4.1. sessions テーブル (会話セッション管理)

| カラム名 | 型 | 制約 | 説明 |
| :--- | :--- | :--- | :--- |
| `id` | TEXT | PRIMARY KEY | セッションの固有ID (`sess_`+タイムスタンプ) |
| `title` | TEXT | NOT NULL | チャットのタイトル |
| `system_instruction` | TEXT | DEFAULT '' | AIへの指示（システムプロンプト） |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | 作成日時 |

### 4.2. messages テーブル (チャット履歴)

| カラム名 | 型 | 制約 | 説明 |
| :--- | :--- | :--- | :--- |
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | メッセージID |
| `session_id` | TEXT | FOREIGN KEY | 紐づくセッションID（セッション削除時連動） |
| `role` | TEXT | NOT NULL | 発言者 (`user` または `model`) |
| `text` | TEXT | NOT NULL | 発言内容（テキスト） |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | 送受信日時 |

## 5. 制限事項・コスト（無料枠）
*   **Cloudflare Workers**: 1日あたり 10万リクエストまで無料。
*   **Cloudflare D1**: ストレージ 5GB、月間閲覧 2,500万行、書込 500万行まで無料。
*   **Google AI Studio**: 1分間あたり 15リクエスト、1日あたり 1,500リクエストまで完全無料（Gemini 2.5 Flash使用時）。
*   *※個人1人での利用であれば、すべての無料枠の上限を大きく下回るため、完全無料で運用可能。*
