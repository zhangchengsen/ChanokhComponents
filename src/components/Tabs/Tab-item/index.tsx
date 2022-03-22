import React, { memo, useContext, useEffect } from "react";
import classNames from "classnames";
import { Context } from "../index";

type ThandleContet = (content: React.ReactNode) => void;
export interface ITabItem {
  disabled?: boolean;
  index?: number;
  style?: React.CSSProperties;
  className?: string;
  title: string;
  handleContent?: ThandleContet;
}

const TabItem: React.FC<ITabItem> = memo((props) => {
  const { title, style, className, index, handleContent, children } = props;
  const context = useContext(Context);

  const classes = classNames("TabItem", className, {
    [`TabItem-active`]: context.index === index,
  });

  useEffect(() => {
    index === context.index &&
      handleContent &&
      handleContent(children ? children : <div></div>);
  }, [context.index, index, handleContent]);

  return (
    <li
      style={style}
      className={classes}
      onClick={() => {
        context.onSelect!(index as number);
      }}
    >
      {title}
    </li>
  );
});
TabItem.defaultProps = {
  disabled: false,
};
TabItem.displayName = "TabItem";
export default TabItem;
