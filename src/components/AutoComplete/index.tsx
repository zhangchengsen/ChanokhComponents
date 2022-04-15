import React, {
  memo,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useRef,
} from "react";
import { Input, InputProps } from "../Input";
import { Icon } from "../Icon";
import { useDebounce } from "../../hooks/useDebounce";
import { useClickOutside } from "../../hooks/useClickOutside";
import classNames from "classnames";
import { Transition } from "../Transition";
export interface DataSourceType {
  value: string;
}
export type IDataSourceType<T = {}> = T & DataSourceType;

export interface AutoCompleteProps
  extends Omit<InputProps, "onSelect" | "prepand" | "append"> {
  onSelect?: (a: IDataSourceType) => void;
  fetchSuggestion?: () => IDataSourceType[] | Promise<IDataSourceType[]>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  renderOptions?: (item: IDataSourceType) => React.ReactElement;
  width?: string;
}

export const AutoComplete: React.FC<AutoCompleteProps> = memo((props) => {
  const {
    onSelect,
    onChange,
    value,
    fetchSuggestion,
    renderOptions,
    width,
    ...restProps
  } = props;
  //   const [text, setText] = useState("");

  const [suggestion, setSuggestion] = useState<IDataSourceType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState("");
  const [focusIdx, setFocusIdx] = useState(-1);
  const triggerSearch = useRef(false);

  const debounce = useDebounce(inputVal, 500);
  const divRef = useRef<HTMLDivElement>(null);

  useClickOutside(divRef, () => setSuggestion([]));
  // Input文本改变
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      triggerSearch.current = false;
      setSuggestion([]);
      setFocusIdx(0);
    }
    if (onChange) onChange(e);
    setInputVal(e.target.value);
    triggerSearch.current = true;
  };
  // 选中值
  const handleSelect = (item: IDataSourceType) => {
    if (onSelect) onSelect(item);
    setInputVal(item.value);
    triggerSearch.current = false;
    setSuggestion([]);
  };
  const renderTemplate = (item: IDataSourceType) => {
    return renderOptions ? renderOptions(item) : item.value;
  };
  const handleIdx = (index: number) => {
    if (index < 0) index = 0;
    else if (index >= suggestion.length) {
      index = suggestion.length - 1;
    }
    setFocusIdx(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // 回车
      case 13:
        if (suggestion[focusIdx]) {
          handleSelect(suggestion[focusIdx]);
          setFocusIdx(-1);
        }

        break;
      // 向上
      case 38:
        handleIdx(focusIdx - 1);
        break;
      //向下
      case 40:
        handleIdx(focusIdx + 1);

        break;
      // Esc
      case 27:
        setSuggestion([]);
        setFocusIdx(-1);
        break;
      default:
        break;
    }
  };

  // 进行搜索
  useEffect(() => {
    if (triggerSearch.current) {
      setLoading(true);
      let fetchValue = (fetchSuggestion && fetchSuggestion()) || [];
      if (fetchValue instanceof Promise) {
        fetchValue
          .then((res) => {
            setSuggestion(res);
            setLoading(false);
            setFocusIdx(0);
          })
          .catch((err) => setLoading(false));
      } else {
        setSuggestion(fetchValue);
        setFocusIdx(0);
        setLoading(false);
      }
    }
  }, [debounce]);

  return (
    <div style={{ width }}>
      <div className="AutoComplete" ref={divRef}>
        <Input
          onChange={(e) => handleChange(e)}
          value={value}
          {...restProps}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
        ></Input>

        <Transition in={suggestion.length > 0} timeout={400} animation="change">
          <ul className="AutoComplete_list" data-testid="AU_ul">
            {loading && <Icon icon="spinner" spin></Icon>}
            {suggestion.map((v, idx) => {
              const active = classNames({
                Focus_item: idx === focusIdx,
              });
              return (
                <li
                  key={idx}
                  className={active}
                  onClick={() => handleSelect(v)}
                >
                  {renderTemplate(v)}
                </li>
              );
            })}
          </ul>
        </Transition>
      </div>
    </div>
  );
});
AutoComplete.defaultProps = {
  fetchSuggestion: () => [],
  width: "300px",
};
