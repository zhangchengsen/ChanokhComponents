import { useEffect, useState } from "react";
export function useDebounce(val: any, delay = 300) {
  const [debounceVal, setDebounceVal] = useState(val);
  // 因为useState是hooks 只在最开始设置一次值 后续不会继续设置初值
  // 但是useEffect会执行return操作
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(val);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [val, delay]);
  return debounceVal;
}
