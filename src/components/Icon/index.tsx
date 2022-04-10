import React, { memo } from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import classNames from "classnames";

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning";
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}
export const Icon: React.FC<IconProps> = memo((props) => {
  const { className, theme, ...restProps } = props;
  const classes = classNames("Icon", className, {
    [`Icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>;
});
