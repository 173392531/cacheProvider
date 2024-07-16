CacheContext

```
简介
CacheContext 是一个基于 React Context API 和 cache-manager 实现的缓存管理解决方案。它允许你在 React 应用中轻松地使用缓存功能，并提供了可配置的 TTL（Time To Live）和最大缓存数。

Introduction
CacheContext is a cache management solution based on React Context API and cache-manager. It allows you to easily use caching in your React application and provides configurable TTL (Time To Live) and maximum cache size.

安装 / Installation
bash
npm install cache-manager
```

使用 / Usage
1. 在应用顶层提供 CacheContext / Provide CacheContext at the Top Level of the Application
在应用的顶层组件中使用 CacheProvider 提供 CacheContext。假设你的顶层组件是 App.tsx：
Use CacheProvider to provide CacheContext at the top level of your application. Assuming your top-level component is App.tsx:

import React from 'react';
import ReactDOM from 'react-dom';
import { CacheProvider } from './CacheContext';
import App from './App';

ReactDOM.render(
  <CacheProvider ttl={600} max={200}> {/* 配置缓存的 TTL 为 600 秒，最大缓存数为 200 */}
    <App />
  </CacheProvider>,
  document.getElementById('root')
);
3. 使用 CacheContext / Use CacheContext
在需要使用缓存功能的组件中使用 useCache 获取 cacheGet。例如：
Use useCache to get cacheGet in components where you need caching functionality. For example:
tsx
Copy
import React, { useState, useEffect } from 'react';
import { useCache } from './CacheContext';

const MyComponent = () => {
  const { cacheGet } = useCache();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await cacheGet('myCacheKey', async () => {
        const response = await fetch('https://api.example.com/data');
        return response.json();
      });
      setData(result);
    };

    fetchData();
  }, [cacheGet]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div>Data: {JSON.stringify(data)}</div>;
};

export default MyComponent;



API
CacheProvider
CacheProvider 组件用于提供缓存上下文。

Props
children (ReactNode): 子组件。
ttl (number, optional): 缓存的 TTL（秒）。默认值为 300。
max (number, optional): 最大缓存数。默认值为 100。

useCache
useCache 钩子用于获取缓存上下文中的 cacheGet 方法。
返回值
cacheGet (function): 用于获取缓存数据的方法。
cacheGet
cacheGet 方法用于获取缓存数据，如果缓存中没有数据，则执行传入的函数并缓存结果。


参数
cacheKey (string): 缓存键。
func (function): 当缓存中没有数据时执行的函数。
Promise<T>: 返回缓存数据或函数执行结果。
示例 / Example
import React from 'react';
import ReactDOM from 'react-dom';
import { CacheProvider } from './CacheContext';
import App from './App';

ReactDOM.render(
  <CacheProvider ttl={600} max={200}>
    <App />
  </CacheProvider>,
  document.getElementById('root')
);

import React, { useState, useEffect } from 'react';
import { useCache } from './CacheContext';

const MyComponent = () => {
  const { cacheGet } = useCache();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await cacheGet('myCacheKey', async () => {
        const response = await fetch('https://api.example.com/data');
        return response.json();
      });
      setData(result);
    };

    fetchData();
  }, [cacheGet]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div>Data: {JSON.stringify(data)}</div>;
};

export default MyComponent;