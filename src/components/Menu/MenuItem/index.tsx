import React, { memo, useContext } from "react";
import { MenuContext } from "../index";
import classNames from "classnames";
export interface IMenuItem {
  disabled?: boolean;
  index?: string;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<IMenuItem> = memo((props) => {
  const context = useContext(MenuContext);
  const { children, disabled, index, style, className } = props;
  const classes = classNames("Menu-item", className, {
    "Menu-disabled": disabled,
    "Menu-active": context.index === index,
  });
  const handleClick = () => {
    if (!disabled && typeof index === "string") context.onSelect!(index);
  };
  return (
    <li className={classes} style={style} onClick={() => handleClick()}>
      {children}
    </li>
  );
});
MenuItem.defaultProps = {
  disabled: false,
};
MenuItem.displayName = "MenuItem";
export default MenuItem;
