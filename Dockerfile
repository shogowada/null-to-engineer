FROM node:14 as base

WORKDIR /app/

COPY ./package.json ./package-lock.json ./
RUN npm ci --only=production && \
  mv ./node_modules/ ./prod_node_modules/ && \
  npm ci

COPY ./tsconfig.json ./
COPY ./src/common/ ./src/common/

COPY ./webpack.config.js ./index.html ./
COPY ./src/client/ ./src/client/
RUN npm run build

COPY ./src/server/ ./src/server/
RUN npm run check-type

CMD ["npm", "run", "_start"]
