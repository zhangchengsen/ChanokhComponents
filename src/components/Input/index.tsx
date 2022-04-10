import React, {
  FC,
  memo,
  InputHTMLAttributes,
  ReactElement,
  CSSProperties,
  useState,
  ChangeEvent,
} from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  size?: "lg" | "sm";
  prepand?: string | ReactElement;
  append?: string | ReactElement;
  disabled?: boolean;
  icon?: IconProp;
  className?: string;
  style?: CSSProperties;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const Input: FC<InputProps> = memo((props) => {
  const {
    size,
    prepand,
    append,
    disabled,
    icon,
    className,
    style,
    ...restProps
  } = props;
  const classes = classNames("Input", {
    [`Input-${size}`]: size,
    "Input-disabled": disabled,
  });
  // const [text, setText] = useState("");
  const wrapper_classes = classNames(className, "Input_wrapper", {
    wrapper_prepand: prepand,
    wrapper_append: append,
    wrapper_disabled: disabled,
  });

  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    <div className={wrapper_classes} style={style}>
      {prepand && <div className="Input_prepand">{prepand}</div>}
      <input
        disabled={disabled}
        {...restProps}
        data-testid="input_id"
        className={classes}
      ></input>
      {append && <div className="Input_append">{append}</div>}
    </div>
  );
});
Input.defaultProps = {
  disabled: false,
};
