const common = `./features --require-module ts-node/register --require ./src/test/hooks/**/*.ts --require ./src/test/steps/**/*.ts`;

const apiCommon = `${common} --require ./src/test/api/**/*.ts`;
const guiCommon = `${common} --require ./src/test/gui/**/*.ts`;

module.exports = {
  api: `${apiCommon} --tags "(@api)"`,
  gui: `${guiCommon} --tags "(@gui)"`,
  apiWIP: `${apiCommon} --tags "(@api and @wip)"`,
  guiWIP: `${guiCommon} --tags "(@gui and @wip)"`,
};
