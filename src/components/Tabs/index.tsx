import React, {
  memo,
  createContext,
  useState,
  useEffect,
  FunctionComponentElement,
} from "react";
import classNames from "classnames";
import Item, { ITabItem } from "./Tab-item";
type selectType = () => void;
type onSelectType = (idx: number) => void;
interface ITabs {
  className?: string;
  defaultActive?: number;
  onSelect?: selectType;
  defaultOpen?: boolean;
}
interface IContext {
  index: number;
  onSelect?: onSelectType;
}

export const Context = createContext<IContext>({ index: 0 });
const Tabs: React.FC<ITabs> = memo((props) => {
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
    console.log(content);
  };

  //获取子组件传递的content
  const getContent = () => {
    return isOpen && <div>{content}</div>;
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

  const classes = classNames("Tabs", className);

  return (
    <div className={classes}>
      <Context.Provider value={passContext}>
        <ul className="Tabs-title">{renderChildren()}</ul>
      </Context.Provider>
      {getContent()}
    </div>
  );
});

export const TabItem = Item;

Tabs.defaultProps = {
  defaultActive: 0,
  defaultOpen: false,
};

export default Tabs;