# カーリース契約者向けマイページ

LINEミニアプリとして動作するカーリース契約者向けマイページアプリケーションです。

## 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **SDK**: LIFF SDK (@line/liff)
- **Deployment**: Vercel

## 機能

- ✅ LIFFによるLINEログイン
- ✅ 契約車両情報の表示
- ✅ メンテナンス予約（プレースホルダー）
- ✅ 事故・トラブル相談
- ✅ プライバシーポリシー・利用規約ページ
- ✅ セーフエリア対応（iPhoneのノッチなど）
- ✅ レスポンシブデザイン

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```env
NEXT_PUBLIC_LIFF_ID=your_liff_id_here
NEXT_PUBLIC_LIFF_URL=https://liff.line.me/your_liff_id
```

LIFF IDは [LINE Developers Console](https://developers.line.biz/console/) で取得できます。

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## デプロイ

### Vercelへのデプロイ

1. [Vercel](https://vercel.com) にログイン
2. 新しいプロジェクトを作成
3. GitHubリポジトリを接続（または手動でデプロイ）
4. 環境変数を設定：
   - `NEXT_PUBLIC_LIFF_ID`: あなたのLIFF ID
   - `NEXT_PUBLIC_LIFF_URL`: LIFFエンドポイントURL
5. デプロイ

### LINEミニアプリとしての設定

1. LINE Developers ConsoleでLIFFアプリを作成
2. Endpoint URLをVercelのデプロイURLに設定
3. LIFF IDを環境変数に設定

## プロジェクト構造

```
.
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # トップページ（マイページ）
│   ├── loading.tsx        # ローディング画面
│   ├── globals.css        # グローバルスタイル
│   ├── privacy-policy/    # プライバシーポリシー
│   ├── terms/             # 利用規約
│   ├── reservation/       # 予約ページ
│   └── settings/          # 設定ページ
├── components/            # Reactコンポーネント
│   ├── Header.tsx         # ヘッダー
│   ├── Footer.tsx         # フッター
│   ├── VehicleInfo.tsx    # 契約車両情報
│   ├── MaintenanceReservation.tsx  # メンテナンス予約
│   └── TroubleConsultation.tsx     # 事故・トラブル相談
├── lib/                   # ユーティリティ
│   └── liff.ts           # LIFF初期化ロジック
└── public/               # 静的ファイル
```

## カスタマイズ

### デザインカラーの変更

`tailwind.config.js` の `colors.primary` を変更することで、アプリのベースカラーを変更できます。

### データの取得

現在、契約車両情報などはデモデータを使用しています。実際のAPIエンドポイントに接続する場合は、以下のファイルを編集してください：

- `components/VehicleInfo.tsx`
- `components/MaintenanceReservation.tsx`

## 注意事項

- LINEミニアプリとして動作させるには、LINEアプリ内で開く必要があります
- 開発環境では、ブラウザで直接開くこともできますが、LIFF機能は制限される場合があります
- セーフエリア対応は主にiOSデバイスで有効です

## ライセンス

このプロジェクトはプロトタイプです。

