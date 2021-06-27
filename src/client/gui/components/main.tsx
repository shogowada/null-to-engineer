import * as React from "react";
import { Route, Switch } from "react-router";
import { RoutePath } from "../../../common";
import { Home } from "./home";

export const Main: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path={RoutePath.instructionUnencoded(":id")} component={Home} />
      <Route component={Home} />
    </Switch>
  );
};
