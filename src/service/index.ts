// 注册
export const register = async form => {
  const res = await fetch(
    'https://www.fastmock.site/mock/2e10db04847afcadd078e88a3dc098f6/rn-api/register',
    {
      body: JSON.stringify(form),
      method: 'post',
      headers: {
        ContentType: 'application/json',
      },
    },
  );

  if (res.status >= 200 && res.status < 300) {
    return await res.json();
  }
  return {};
};

// 登录
export const login = async form => {
  const res = await fetch(
    'https://www.fastmock.site/mock/2e10db04847afcadd078e88a3dc098f6/rn-api/login',
    {
      body: JSON.stringify(form),
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
    },
  );
  if (res.status >= 200 && res.status < 300) {
    return await res.json();
  }
  return {};
};

// 查询搜索历史及热门
export const getSearchInfo = async () => {
  const res = await fetch(
    'https://www.fastmock.site/mock/2e10db04847afcadd078e88a3dc098f6/rn-api/search-info',
  );
  if (res.status >= 200 && res.status < 300) {
    return await res.json();
  }
  return {};
};

// 根据关键字进行搜索
export const getSearchList = async text => {
  const res = await fetch(
    'https://www.fastmock.site/mock/2e10db04847afcadd078e88a3dc098f6/rn-api/search-list',
  );
  if (res.status >= 200 && res.status < 300) {
    return await res.json();
  }
  return [];
};
