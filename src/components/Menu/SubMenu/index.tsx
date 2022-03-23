import React, {
  FunctionComponentElement,
  memo,
  useState,
  useContext,
} from "react";
import { IMenuItem } from "../MenuItem";
import { MenuContext } from "../index";
import Icon from "../../Icon";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
export interface ISubMenuProps {
  index?: string;
  title?: string;
  className?: string;
  defaultOpen?: boolean;
}
const SubMenu: React.FC<ISubMenuProps> = memo((props) => {
  const context = useContext(MenuContext);
  const { className, title, index, children, defaultOpen, ...restProps } =
    props;
  const [show, setShow] = useState(
    context.mode === "vertical" ? defaultOpen : false
  );

  const { mode } = context;
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShow(!show);
  };
  let timer: any;
  const handleHover = (e: React.MouseEvent, mode: boolean) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setShow(mode);
    }, 200);
  };
  const clickEvent = () => {
    return mode === "vertical"
      ? { onClick: (e: React.MouseEvent) => handleClick(e) }
      : {};
  };
  const hoverEvent = () => {
    return mode === "horizontal"
      ? {
          onMouseOver: (e: React.MouseEvent) => handleHover(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleHover(e, false),
        }
      : {};
  };
  const renderChildren = () => {
    const cpnClass = classNames("SubMenu-wrap", {
      "Menu-open": show,
    });
    const childrenComponent = React.Children.map(children, (item, idx) => {
      const childrenEle = item as FunctionComponentElement<IMenuItem>;
      const { displayName } = childrenEle.type;
      if (displayName !== "MenuItem") {
        throw "SubMenu children must be MenuItem";
        return "";
        // 产生 2-1的形式
      } else
        return React.cloneElement(childrenEle, { index: `${index}-${idx}` });
    });
    return <ul className={cpnClass}>{childrenComponent}</ul>;
  };

  const classes = classNames(className, "Sub-menu", {
    "Menu-open": show,
    [`border-${context.mode === "vertical" ? "left" : "bottom"}`]:
      index && context.index.startsWith(index + "-"),
    [`vertical-active`]: context.mode === "vertical" && show,
  });
  const iconClasses = classNames(`iconfont icon-xiala arrow-icon`, {
    [`is-${context.mode}`]: context.mode,
  });
  return (
    <li className={classes} {...restProps} {...hoverEvent()}>
      <div className={`submenu-title`} {...clickEvent()}>
        {title}
        <span className={iconClasses}></span>
      </div>
      <CSSTransition
        in={show}
        unmountOnExit={true}
        classNames="fold"
        timeout={400}
      >
        {renderChildren()}
      </CSSTransition>
    </li>
  );
});
SubMenu.defaultProps = {
  defaultOpen: false,
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
