import React, { CSSProperties, memo, useRef, useState, useEffect } from "react";
import classNames from "classnames";

export interface IProgressProps {
  scrollHeight?: number;
  percent?: number;
  type?: string;
  showText?: boolean;
  styles?: CSSProperties;
}

export const Progress: React.FC<IProgressProps> = memo((props) => {
  const { styles, scrollHeight, percent, type, showText } = props;

  const classes = classNames("");
  const [offset, setOffset] = useState<number>(-1);
  // const [isDragging, setIsDragging] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef(null);
  const barWidth = useRef(null);
  const isDragging = useRef(false);
  const [barPercent, setBarPercent] = useState(0);

  useEffect(() => {
    if (percent) setBarPercent(percent);
    let el = document.getElementsByClassName("Progress-bar-outter") as any;
    barWidth.current = el[0].offsetWidth;
  }, [percent]);

  // 移动
  const handleMouseMove = (e: any) => {
    console.log("move", isDragging);
    if (!isDragging.current) return;
    const wrapper = divRef.current?.offsetLeft;
    let num: number = 0;
    if (wrapper && barWidth.current)
      num = Math.round(
        ((e.clientX * 1 - wrapper * 1) / barWidth.current) * 100
      );
    if (num > 100) num = 100;
    setBarPercent(num);
  };
  // 抬起
  const handleMouseUp = () => {
    if (isDragging) isDragging.current = false;
    console.log(isDragging);
    divRef.current?.removeEventListener("mousemove", handleMouseMove);
  };
  // 按下
  const handleDown = (e: any) => {
    const wrapper = divRef.current?.offsetLeft;
    isDragging.current = true;

    let num: number = 0;
    if (wrapper && barWidth.current)
      num = Math.round(
        ((e.clientX * 1 - wrapper * 1) / barWidth.current) * 100
      );
    if (num > 100) num = 100;
    setBarPercent(num);
    divRef.current?.addEventListener("mousemove", handleMouseMove);
  };

  return (
    <div className={classes} style={styles}>
      <div
        className={`Progress-bar-outter `}
        ref={divRef}
        style={{ height: `${scrollHeight}px` }}
        onMouseDown={(e) => {
          e.preventDefault(); //去掉禁止框
          handleDown(e);
        }}
        onMouseLeave={() => handleMouseUp()}
        onMouseUp={() => {
          handleMouseUp();
        }}
      >
        <div
          className={`Progress-bar-inner `}
          style={{ width: `${barPercent}%`, lineHeight: `${scrollHeight}px` }}
        >
          {showText && (
            <div
              className="Progress-bar-inner-text"
              style={{ paddingRight: "10px", zIndex: 5 }}
            >
              {barPercent + "%"}
            </div>
          )}
          <div className={`Progress-bar-bg type-${type}`}></div>
          <div className="Progress-bar-drag no_flash">
            <div
              draggable="true"
              className="Progress-bar-drag-dot"
              ref={dragRef}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
});
Progress.defaultProps = {
  percent: 0,
  type: "primary",
  showText: true,
  scrollHeight: 30,
};
