import React, { CSSProperties, memo, useRef, useState, useEffect } from "react";
import classNames from "classnames";

export interface IProgressProps {
  scrollHeight?: number;
  percent?: number;
  type?: string;
  showText?: boolean;
  styles?: CSSProperties;
  showDots?: boolean;
  onChange?: (n: number) => void;
  width?: string;
  className?: string;
}

export const Progress: React.FC<IProgressProps> = memo((props) => {
  const {
    styles,
    scrollHeight,
    percent,
    type,
    showText,
    showDots,
    onChange,
    width,
    className,
  } = props;

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
    // console.log(barWidth);
  }, [percent, width]);

  // 移动
  const handleMouseMove = (e: any) => {
    if (!isDragging.current) return;
    const wrapper = divRef.current?.offsetLeft;
    let num: number = 0;
    if (wrapper && barWidth.current)
      num = Math.round(
        ((e.clientX * 1 - wrapper * 1) / barWidth.current) * 100
      );
    updatePercent(num);
  };
  // 抬起
  const handleMouseUp = () => {
    if (!showDots) return;
    if (isDragging) isDragging.current = false;
    // console.log(isDragging);
    divRef.current?.removeEventListener("mousemove", handleMouseMove);
  };
  // 按下
  const handleDown = (e: any) => {
    if (!showDots) return;
    const wrapper = divRef.current?.offsetLeft;
    isDragging.current = true;

    let num: number = 0;
    if (wrapper && barWidth.current)
      num = Math.round(
        ((e.clientX * 1 - wrapper * 1) / barWidth.current) * 100
      );

    divRef.current?.addEventListener("mousemove", handleMouseMove);
    updatePercent(num);
  };
  const updatePercent = (num: number) => {
    if (num > 100) num = 100;
    else if (num < 0) num = 0;
    if (num !== barPercent) {
      setBarPercent(num);
      if (onChange) onChange(num);
    }
  };

  return (
    <div
      className={`Progress-bar-outter ${className}`}
      ref={divRef}
      style={{ ...styles, height: `${scrollHeight}px`, width }}
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
        {showDots && (
          <div className="Progress-bar-drag">
            <div
              draggable="true"
              className="Progress-bar-drag-dot"
              ref={dragRef}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
});
Progress.defaultProps = {
  percent: 0,
  type: "primary",
  showText: true,
  scrollHeight: 30,
  showDots: false,
  width: "400px",
};
