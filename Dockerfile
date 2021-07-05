FROM null-to-web-engineer:base as client

COPY webpack.config.js ./index.html ./
COPY ./src/client ./src/client/
RUN npm run build

FROM null-to-web-engineer:base as server

COPY ./src/server ./src/server/
RUN npm run check-type

FROM null-to-web-engineer:base

RUN apk --no-cache add curl

RUN rm -rf ./node_modules/ && \
  mv ./prod_node_modules/ ./node_modules

COPY --from=client /app/public/ ./public/
COPY ./src/server ./src/server/

HEALTHCHECK --start-period=10s --retries=1 CMD curl -f http://localhost/webapi || exit 1

CMD ["npm", "run", "_start"]
