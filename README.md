# Reactのサンプルリポジトリです
以下のURLで公開しています。
https://aiueo-rysk.github.io/


# ローカル起動

## 前提条件
- [node.jsのインストール](https://nodejs.org/ja)

## 起動方法
1. vscodeでルートフォルダを開く
1. `cd my-app` でディレクトリ移動
1. `npm start` でlocalhost:3000で起動


# デプロイ
1. `cd my-app` でディレクトリ移動
1. `npm run build` で /build配下に静的ファイルを生成
1. /buildのファイルを /docsにコピーする
1. githubに変更をpushする