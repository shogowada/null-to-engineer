FROM null-to-engineer:base as client-code

COPY ./webpack.config.js ./index.template.html ./
COPY ./imgs ./imgs
COPY ./src/client ./src/client/
RUN npm run build-code && \
  npm run unit-test-client

FROM null-to-engineer:base as client-instructions

COPY ./instructions ./instructions
COPY ./src/build ./src/build/
RUN npm run build-instructions

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
COPY --from=client-code /app/public/ ./public/
COPY --from=client-instructions /app/public/ ./public/
COPY --from=server /app/src/ ./src/

HEALTHCHECK --start-period=10s --retries=1 CMD curl -f http://localhost/webapi || exit 1

EXPOSE 80

CMD ["npm", "run", "_start"]
