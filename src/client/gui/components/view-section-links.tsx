import * as React from "react";
import { Link } from "react-router-dom";
import { createAnchor } from "./create-anchor";

interface Props {
  baseHref: string;
  sections: string[];
  onClick: (href: string) => void;
}

export const ViewSectionLinks: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <ul className="section-list">
      {props.sections.map((section) => {
        const href: string = `${props.baseHref}#${createAnchor(section)}`;
        return (
          <li
            key={section}
            className="section-list-item"
            onClick={(event) => {
              event.stopPropagation();
              props.onClick(href);
            }}
          >
            <Link to={href}>{section}</Link>
          </li>
        );
      })}
    </ul>
  );
};
