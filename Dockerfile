FROM null-to-web-engineer:base as client

COPY webpack.config.js ./index.html ./
COPY ./src/client ./src/client/
RUN npm run build

FROM null-to-web-engineer:base as server

COPY ./src/server ./src/server/
RUN npm run check-type

FROM null-to-web-engineer:base

RUN rm -rf ./node_modules/ && \
  mv ./prod_node_modules/ ./node_modules

COPY --from=client /app/public/ ./public/
COPY ./src/server ./src/server/

CMD ["npm", "run", "_start"]
