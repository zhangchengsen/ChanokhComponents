import React, { memo } from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
type AnimationName =
  | "zoom-right"
  | "zoom-left"
  | "zoom-top"
  | "zoom-bottom"
  | "change";
type ITransitionProps = { animation?: AnimationName; wrapper?: boolean };
// 继承第三方库原来的属性
type TransitionProps = ITransitionProps & CSSTransitionProps;

export const Transition: React.FC<TransitionProps> = memo((props) => {
  const { wrapper, animation, children, classNames, ...restProps } = props;
  return (
    <CSSTransition
      in={restProps.in ?? false}
      timeout={restProps.timeout ?? 600}
      unmountOnExit
      appear
      classNames={animation ?? classNames}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
});
