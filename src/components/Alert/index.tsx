import React, { memo, useState, useEffect } from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
export const enum AlertType {
  Danger = "danger",
  Primary = "primary",
  Info = "info",
  Success = "success",
  Default = "default",
}
interface IAlert {
  type?: string;
  title?: string;
  description?: string;
  top?: string;
  duration?: number;
  onClose?: () => void;
}
export type PAlert = IAlert & React.HTMLAttributes<HTMLElement>;
const Alert: React.FC<PAlert> = memo((props) => {
  const {
    type,
    title,
    description,
    className,
    onClose,
    top,
    duration,
    ...restProps
  } = props;
  const [show, setState] = useState(true);
  let [target, setTarget] = useState<HTMLElement | null>(null);
  const close = () => {
    if (!duration) {
      setState(false);
    }
    onClose!();
  };
  useEffect(() => {
    if (duration) {
      setTimeout(() => {
        setState(false);
      }, duration);
    }
  }, [duration]);
  const classes = classNames(className, {
    [`Alert-${type}`]: type,
  });
  useEffect(() => {
    let preTar = document.getElementById("alert_div");
    if (!preTar) {
      let popupMaskNode = document.createElement("div");
      popupMaskNode.setAttribute("id", "alert_div");
      popupMaskNode.setAttribute("class", "position-fixed top-0 left-center");
      document.body.appendChild(popupMaskNode);
    }
    let tar = document.getElementById("alert_div");
    setTarget(tar);
  }, []);
  return target ? (
    createPortal(
      <CSSTransition
        timeout={500}
        classNames="Alert"
        unmountOnExit={true}
        appear
        in={show}
      >
        <div className="m-2">
          <div
            data-testid="alert_id"
            className={classes}
            style={{ top }}
            {...restProps}
          >
            <div className="title-wrap">
              <div className="title">{title}</div>
              <div className="close" onClick={() => close()}>
                {duration ? "" : "x"}
              </div>
            </div>
            <div className="description">
              {description || restProps.children}
            </div>
          </div>
        </div>
      </CSSTransition>,
      target
    )
  ) : (
    <div></div>
  );
});
Alert.defaultProps = {
  title: "This is an Alert",
  type: AlertType.Primary,
  onClose: () => {
    return;
  },
  top: "10%",
};
export default Alert;
