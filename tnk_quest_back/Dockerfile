# Node.jsの公式イメージをベースにする。バージョンはアプリケーションの要件に応じて調整。
FROM node:lts-alpine3.18

# アプリケーションのソースコードを配置する作業ディレクトリを設定
WORKDIR /usr/src/app

# アプリケーションの依存関係のファイル（package.json と package-lock.json）をコピー
COPY package*.json ./

# npmを使用して依存関係をインストール。本番用の依存関係のみをインストールする場合は、--only=productionを追加。
RUN npm install

# 環境変数PATHを設定して、node_modules/.bin内の実行可能ファイルがパスに追加されるようにする
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションがバインドするポートを指定
EXPOSE 3000

# アプリケーションの実行コマンド
CMD ["node", "app.js"]
