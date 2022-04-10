import React, {
  memo,
  createContext,
  useState,
  useEffect,
  FunctionComponentElement,
} from "react";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import { ITabItem } from ".";
export * from "./Tab-item";
type selectType = () => void;
type onSelectType = (idx: number) => void;
export interface ITabs {
  className?: string;
  defaultActive?: number;
  onSelect?: selectType;
  defaultOpen?: boolean;
}
export interface IContext {
  index: number;
  onSelect?: onSelectType;
}

export const Context = createContext<IContext>({ index: 0 });
export const Tabs: React.FC<ITabs> = memo((props) => {
  const { children, className, defaultActive, defaultOpen, onSelect } = props;

  const [curIdx, setCurIdx] = useState(0);
  const [content, setContent] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (defaultActive) {
      setCurIdx(defaultActive);
    }
    if (defaultOpen) {
      setIsOpen(defaultOpen);
    }
  }, [defaultActive, defaultOpen]);

  const handleContent = (content: any) => {
    if (content) setContent(content);
  };

  //获取子组件传递的content
  const getContent = () => {
    return <div>{content}</div>;
  };

  // 点击回调
  const handleSelect = (idx: number) => {
    setCurIdx(idx);
    onSelect && onSelect();
  };

  const passContext: IContext = {
    index: curIdx,
    onSelect: handleSelect,
  };

  // 添加 index 和获取content事件
  const renderChildren = () => {
    return React.Children.map(children, (child, idx) => {
      const c = child as FunctionComponentElement<ITabItem>;
      const { displayName } = c.type;

      if (displayName !== "TabItem") {
        throw "Tabs children must be TabItem";
      } else {
        return React.cloneElement(c, {
          index: idx,
          handleContent,
        });
      }
    });
  };

  const classes = classNames("Tabs", className, {
    "Tabs-mb": isOpen,
  });

  return (
    <div className={classes}>
      <Context.Provider value={passContext}>
        <ul className="Tabs-title">{renderChildren()}</ul>
      </Context.Provider>
      <CSSTransition
        classNames="change"
        timeout={600}
        in={isOpen}
        appear
        unmountOnExit={true}
      >
        <div>{getContent()}</div>
      </CSSTransition>

      <div className={`Tabs-bottom ${isOpen ? "up" : "down"} `}>
        <div
          data-testid="drag"
          onClick={() => setIsOpen(!isOpen)}
          className={`iconfont icon-${isOpen ? "shangla" : "shangla1"}`}
        ></div>
      </div>
    </div>
  );
});

Tabs.defaultProps = {
  defaultActive: 0,
  defaultOpen: false,
};
