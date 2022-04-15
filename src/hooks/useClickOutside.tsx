import { RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: Function
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) return;
      callback();
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
    // 注意return 要写成函数形式
    // 因为输入文本的时候 ref会发生变化 所以会重新开启监听
  }, [ref, callback]);
};
