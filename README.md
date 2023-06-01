# React＋MaterialUIの練習用のリポジトリです
以下のURLで公開しています。
https://aiueo-rysk.github.io/

フォルダ構成は以下のリポジトリを真似しています。
https://github.com/alan2207/bulletproof-react

こちらの記事も参考にしてます。
https://zenn.dev/t_keshi/articles/bulletproof-react-2022

```
src
├── assets            # 画像やフォントなどの静的ファイル
├── components        # アプリケーション全体で使用できる共通コンポーネント
├── config            # 環境変数などをエクスポートするところ
├── features          # 機能ベースモジュール
├── hooks             # アプリケーション全体で使用できる共通hooks
├── lib               # ライブラリをアプリケーション用に設定して再度エクスポートしたもの
├── providers         # アプリケーションのすべてのプロバイダー
├── routes            # ルーティングの設定
├── stores            # グローバルステートストア
├── test              # テストユーティリティとモックサーバ
├── types             # アプリケーション全体で使用される基本的な型の定義
└── utils             # 共通のユーティリティ関数
```


# ローカル起動

## 前提条件
- [node.jsのインストール](https://nodejs.org/ja)

## 起動方法
1. vscodeでルートフォルダを開く
1. `cd my-app` でディレクトリ移動
1. `npm install` でモジュールをインストール（初回のみ）
1. `npm start` でlocalhost:3000で起動


# デプロイ
1. `cd my-app` でディレクトリ移動
1. `npm run build` で /build配下に静的ファイルを生成
1. /buildのファイルを /docsにコピーする
1. githubに変更をpushする

# メモ

日本株の一覧の情報源
https://www.jpx.co.jp/markets/statistics-equities/misc/01.html
