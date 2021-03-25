// 查询商品分类
export const getCategories = async () => {
  const res = await fetch('https://www.fastmock.site/mock/2e10db04847afcadd078e88a3dc098f6/rn-api/categories');
  if (res.status >= 200 && res.status < 300) {
    return await res.json();
  }
  return [];
};

// 查询商品分类详情
export const getCategoryLink = async (id) => {
  const res = await fetch('https://www.fastmock.site/mock/2e10db04847afcadd078e88a3dc098f6/rn-api/category-link');
  if (res.status >= 200 && res.status < 300) {
    return await res.json();
  }
  return [];
};
