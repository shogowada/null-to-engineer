import * as React from "react";
import { Route, Switch, useLocation } from "react-router";
import { eventually, RoutePath } from "../../../common";
import { Home } from "./home";

export const Main: React.FunctionComponent = () => {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      eventually(async () => scrollHashElementIntoView(hash), {
        timeout: 10 * 1000,
        interval: 100,
      }).then(undefined, (error) =>
        console.warn(`Failed to scroll ${hash} into view`, error)
      );
    } else {
      setTimeout(
        () => document.querySelector(".item-instruction")?.scroll(0, 0),
        0
      );
    }
  }, [pathname, hash]);

  return (
    <Switch>
      <Route path={RoutePath.instructionUnencoded(":id")} component={Home} />
      <Route component={Home} />
    </Switch>
  );
};

const scrollHashElementIntoView = (hash: string): void => {
  const id: string = decodeURIComponent(hash.replace("#", ""));
  const element = document.getElementById(id);
  if (element && element.offsetParent) {
    element.scrollIntoView();
  } else {
    throw new Error(`Element with ID ${id} is not found for hash ${hash}`);
  }
};
