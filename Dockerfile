FROM null-to-engineer:base as client

COPY ./webpack.config.js ./index.template.html ./
COPY ./imgs ./imgs
COPY ./instructions ./instructions
COPY ./src/client ./src/client/
COPY ./src/build ./src/build/
RUN npm run build && \
  npm run unit-test-client

FROM null-to-engineer:base as server

COPY ./src/server ./src/server/
RUN npm run check-type

FROM node:16-alpine

WORKDIR /app/

COPY ./package.json ./package-lock.json ./
RUN npm ci --only=production && \
  npm cache clean --force && \
  apk --no-cache add curl

COPY ./tsconfig.json ./
COPY ./src/common/ ./src/common/
COPY --from=client /app/public/ ./public/
COPY --from=server /app/src/server/ ./src/server/

HEALTHCHECK --start-period=10s --retries=1 CMD curl -f http://localhost/webapi || exit 1

EXPOSE 80

CMD ["npm", "run", "_start"]
