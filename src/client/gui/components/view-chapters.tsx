import * as React from "react";
import { Chapters } from "../../../common";
import { ViewSections } from "./view-sections";

export const ViewChapters: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      {Chapters.map((chapter) => (
        <div key={chapter.id}>
          <h3>{chapter.id}</h3>
          <ul>
            <ViewSections instructionIDs={chapter.instructionIDs} />
          </ul>
        </div>
      ))}
    </React.Fragment>
  );
};
