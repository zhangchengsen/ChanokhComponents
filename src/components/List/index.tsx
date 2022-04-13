import React, { CSSProperties, memo, ReactElement } from "react";
import classNames from "classnames";

export interface IListProps {
  top?: ReactElement;
  middleLeft?: ReactElement;
  middleCenter?: ReactElement;
  middleRight?: ReactElement;
  bottom?: ReactElement;
  border?: boolean;
  className?: string;
  width?: string;
  middleStyle?: CSSProperties;
  middleClass?: string;
}
export const List: React.FC<IListProps> = memo((props) => {
  const {
    top,
    middleLeft,
    middleRight,
    bottom,
    border,
    className,
    width,
    middleStyle,
    middleClass,
    ...restProps
  } = props;

  const classes = classNames(className, "List", {
    List_border: border,
  });
  const middleClasses = classNames(middleClass, "List_middle");

  return (
    <div style={{ width }} {...restProps} className={classes}>
      {top}
      <div className={middleClasses} style={middleStyle}>
        {middleLeft}
        {middleRight}
      </div>
      <div className="List_middle_right">{bottom}</div>
    </div>
  );
});
List.defaultProps = {
  border: true,
  width: "300px",
  middleClass: "",
};
