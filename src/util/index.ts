// 通用工具

// 防抖-带参
export const debounce = (fn, options?) => {
  let args, timer;
  let timeout = options?.timeout || 300;
  return (...list) => {
    args = list;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = 0;
      fn.apply(null, args);
    }, timeout);
  };
};

// 节流-带参
export const throttle = (fn, options?) => {
  let args, timer;
  let timeout = options?.timeout || 300;
  return (...list) => {
    if (timer) return;
    args = list;
    timer = setTimeout(() => {
      timer = 0;
      fn.apply(null, args);
    }, timeout);
  };
};
