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

FROM null-to-engineer:base

RUN apk --no-cache add curl

RUN rm -rf ./node_modules/ && \
  mv ./prod_node_modules/ ./node_modules

COPY --from=client /app/public/ ./public/
COPY --from=server /app/src/server ./src/server/

HEALTHCHECK --start-period=10s --retries=1 CMD curl -f http://localhost/webapi || exit 1

CMD ["npm", "run", "_start"]
