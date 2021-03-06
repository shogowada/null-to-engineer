# 開発環境を整える

## 開発環境？

ここからは自分のパソコンを使って、プロのエンジニアがやっている手順と同じ手順でウェブアプリの開発に取り組もう ✨

最初に２つのプログラムをインストールするよ 👀

1. IDE（アイ・ディー・イー、Integrated Development Environment）
   - 主にコードを編集するためのプログラム。その他にも色々と開発の手助けをしてくれる機能が万歳。
2. Node.js（ノード・ジェーエス、ノード）、NPM（エヌ・ピー・エム）
   - パソコンで JavaScript を実行するためのプログラム。

## IDE をインストールする

Microsoft が出している [Visual Studio Code](https://code.visualstudio.com)（以下 VS Code）は、無料で使えてウェブアプリの開発もできるから便利だよ 😄

1. [VS Code のウェブサイト](https://code.visualstudio.com)にいく
2. Stable ヴァージョンをダウンロードする
3. ダウンロードされた VS Code をインストールする
   - Windows の場合、ダウンロードされた`VSCodeUserSetup-{version}.exe`ファイルを実行する
     - `{version}`には現在のバージョンが入ります
   - macOS の場合、ダウンロードされた`Visual Studio Code.app`ファイルを`Applicaations`フォルダに移動する
4. インストールされた VS Code を実行する
5. VS Code が開かれたら成功

## Node.js と NPM をインストールする

Node.js は JavaScript を実行するプログラム、NPM は JavaScript のライブラリを管理するプログラムなんだ。
つまり NPM を使って React や Babel などを自分のパソコンにダウンロードすることができるよ 😮

1. [Node.js のウェブサイト](https://nodejs.org/ja/)にいく
2. LTS ヴァージョンをダウンロードする
3. ダウンロードされたファイルをインストールする
4. インストールされた Node.js と NPM を実行してみる
   1. Windows の場合はコマンドプロンプト、macOS の場合はターミナルを開く
   2. `node --version`を実行する
   3. 次のような文字列が表示されたら成功（数字は一致しなくてもいい）：`v14.17.4`
   4. `npm --version`を実行する
   5. 次のような文字列が表示されたら成功（数字は一致しなくてもいい）：`6.14.14`
