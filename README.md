# null-to-web-engineer

０からウェブソフトウェアエンジニアを目指す人に向けたチュートリアルです 🎉

## 構造

| 場所                               | 役割                                                 |
| ---------------------------------- | ---------------------------------------------------- |
| [`./features`](./features)         | E2e テストシナリオ                                   |
| [`./imgs`](./imgs)                 | イメージファイル                                     |
| [`./instructions`](./instructions) | 記事                                                 |
| [`./src/client`](./src/client)     | クライアントコード                                   |
| [`./src/server`](./src/server)     | サーバーコード                                       |
| [`./src/test`](./src/test)         | E2e テストコード                                     |
| [`./src/common`](./src/common)     | クライアント、サーバー、e2e テストで共有されるコード |

## 記事

記事は[`./instructions`](./instructions)に Markdown としてまとめられています。

ビルド時には[`./src/generate-code.ts`](./src/generate-code.ts)によってこれらの記事からメタデータ（題名や目次）を抽出し、
[`./src/common/instruction-metadata-list.ts`](./src/common/instruction-metadata-list.ts)に出力します。

サーバーは実行時に全ての記事を HTML へと変換します。HTML は API を通じて、必要なときに必要な分だけクライアントに渡されます。

## 開発

### 環境

ビルド・実行・テストは Docker 上で行う。それぞれ NPM コマンドから走らせられるようになっています。

- [NPM](https://nodejs.org/en/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 実行

Docker イメージをビルドし、走らせます。

1. `npm start`

### テスト

#### ユニットテスト

ユニットテストはビルド中に走ります。`<ターゲット>.spec.ts`という名前で、テストターゲットと同じフォルダに置いてください。

#### E2e テスト

E2e テストシナリオは[`./features`](./features)に、コードは[`./src/test`](./src/test)にまとめられています。
中身は Cucumber と Selenium。

ターゲットが API の場合は`@api`タグを、GUI の場合は`@gui`タグが必要。もちろん、両方つけることもできます。
API テストのコードは[`./src/test/api`](./src/test/api)に、GUI テストのコードは[`./src/test/gui`](./src/test/gui)にあります。

以下のコマンドで走ります。

1. `npm test`

以下のコマンドで、`@wip`タグをつけたテストだけ走らすことができます。いくつかのテストシナリオだけに集中したい場合に便利 👍

1. `npm run test-wip`
