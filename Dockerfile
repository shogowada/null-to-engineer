FROM null-to-engineer:base as client

COPY ./webpack.config.js ./index.template.html ./
COPY ./imgs ./imgs
COPY ./src/client ./src/client/
RUN npm run build && \
  npm run unit-test-client

FROM null-to-engineer:base as server

COPY ./src/client ./src/client/
COPY ./src/server ./src/server/
RUN npm run check-type && \
  npm run unit-test-server

FROM node:16-alpine

WORKDIR /app/

COPY ./package.json ./package-lock.json ./
RUN npm ci --only=production && \
  npm cache clean --force && \
  apk --no-cache add curl

COPY ./tsconfig.json ./
COPY ./instructions ./instructions/
COPY --from=client /app/public/ ./public/
COPY --from=server /app/src/ ./src/

HEALTHCHECK --start-period=10s --retries=1 CMD curl -f http://localhost/health || exit 1

EXPOSE 80

CMD ["npm", "run", "_start"]
