import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Intersector = ({
  callback,
  viewflag,
  sizePx,
}: {
  callback: any;
  viewflag: boolean;
  sizePx: number;
}) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.01,
  });

  useEffect(() => {
    if (viewflag) {
      if (inView) callback(true);
    } else {
      if (!inView) {
        callback(true);
      } else {
        callback(false);
      }
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      style={{
        padding: `${sizePx}px`,
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    />
  );
};

export default Intersector;
