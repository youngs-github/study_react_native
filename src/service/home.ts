// 主页接口
// 查询热门推荐商品
export const getHotProduct = async () => {
  const res = await fetch('https://www.fastmock.site/mock/2e10db04847afcadd078e88a3dc098f6/rn-api/hots');
  if (res.status >= 200 && res.status < 300) {
    return await res.json();
  }
  return [];
};

// 查询快速导航对象
export const getQuickNav = async () => {
  const res = await fetch('https://www.fastmock.site/mock/2e10db04847afcadd078e88a3dc098f6/rn-api/quick-nav');
  if (res.status >= 200 && res.status < 300) {
    return await res.json();
  }
  return [];
};

// 查询秒杀商品对象
export const getSecKills = async () => {
  const res = await fetch('https://www.fastmock.site/mock/2e10db04847afcadd078e88a3dc098f6/rn-api/sec-kill');
  if (res.status >= 200 && res.status < 300) {
    return await res.json();
  }
  return {};
};

// 查询更多秒杀商品
export const getMoreKills = async () => {
  const res = await fetch('https://www.fastmock.site/mock/2e10db04847afcadd078e88a3dc098f6/rn-api/more-kill');
  if (res.status >= 200 && res.status < 300) {
    return await res.json();
  }
  return {};
};

// 查询为你推荐商品
export const getRefFloor = async () => {
  const res = await fetch('https://www.fastmock.site/mock/2e10db04847afcadd078e88a3dc098f6/rn-api/rec-floor');
  if (res.status >= 200 && res.status < 300) {
    return await res.json();
  }
  return [];
};
