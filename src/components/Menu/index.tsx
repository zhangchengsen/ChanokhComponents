import React, { memo, createContext, useState, useEffect } from "react";
import classNames from "classnames";
import Item from "./MenuItem";
import Sub from "./SubMenu";
import Alert from "../Alert";

type selectMode = "vertical" | "horizontal";
type setSelect = (idx: string) => void;
export const MenuItem = Item;
export const SubMenu = Sub;
export interface IMenuProps {
  defaultIdx?: string;
  mode?: selectMode;
  onSelect?: setSelect;
  className?: string;
  style?: React.CSSProperties;
}
interface IMenuContext {
  index: string;
  onSelect?: setSelect;
  mode?: string;
}
export const MenuContext = createContext<IMenuContext>({ index: "0" });
const Menu: React.FC<IMenuProps> = memo((props) => {
  const { children, mode, onSelect, style, className, defaultIdx } = props;
  const classes = classNames("Menu", className, {
    [`Menu-${mode}`]: mode,
  });
  const [curIdx, setCurIdx] = useState("0");
  useEffect(() => {
    setCurIdx(defaultIdx ? defaultIdx : curIdx);
  }, [defaultIdx]);
  // 回调 接受用户需求 同时改变index
  const handleClick = (index: string): void => {
    setCurIdx(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  // 传递给Menu.item

  const passContext: IMenuContext = {
    index: curIdx,
    // 传递回调
    onSelect: handleClick,
    mode,
  };

  // 处理chidren 防止不是MenuItem

  const renderChildren = () => {
    let flag = 1;
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<IMenuContext>;
      const { displayName } = childElement.type;

      if (!flag) return "";
      else if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childElement, { index: index.toString() });
      } else {
        flag = 0;
        return (
          <Alert type="danger" title="Error">
            Menu's children must be MenuItem
          </Alert>
        );
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="Menu-wrap">
      {/* 传递数据 */}
      <MenuContext.Provider value={passContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
});
Menu.defaultProps = {
  defaultIdx: "0",
  mode: "horizontal",
  onSelect: () => {},
};

export default Menu;