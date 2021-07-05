# null-to-web-engineer

０からウェブソフトウェアエンジニアを目指す人に向けたチュートリアル 🎉

## 記事

記事は[`./src/server/business/instructions`](./src/server/business/instructions)に Markdown としてまとめられている。
サーバーは実行時にこれらからそれぞれの記事の題名（最初の行のヘッダー）や目次（その後`##`で宣言されたヘッダー）を読み込み、
クライアントへ渡すための HTML へと変換する。

## 開発環境

ビルド・実行・テストは Docker 上で行う。NPM コマンドから Docker を走らせられるようになっているため、NPM もインストールしておくと便利。

- [NPM](https://nodejs.org/en/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## ビルド

Docker イメージをビルドし、走らせる。

1. `npm start`

## テスト

アプリとテストの Docker イメージをビルドし、走らせる。中身は Cucumber と Selenium を使った e2e テスト。

1. `npm test`
