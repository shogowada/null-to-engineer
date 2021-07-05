import * as React from "react";

interface Props {
  height: string;
  margin: string;
}

export const Skeleton: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div
      className="skeleton"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundImage: `linear-gradient(#eeeeee ${props.height}, transparent 0)`,
        height: props.height,
        margin: props.margin,
      }}
    />
  );
};
