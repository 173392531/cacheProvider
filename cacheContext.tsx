import React, {
  createContext,
  useContext,
  ReactNode,
  useRef,
  useCallback,
} from 'react';
import cacheManager from 'cache-manager';

interface CacheContextProps {
  cacheGet: <T>(cacheKey: string, func: () => Promise<T>) => Promise<T>;
}

const defaultCacheContext: CacheContextProps = {
  cacheGet: <T,>(cacheKey: string, func: () => Promise<T>) => func(),
};

const CacheContext = createContext<CacheContextProps>(defaultCacheContext);

interface CacheProviderProps {
  children: ReactNode;
  ttl?: number;
  max?: number;
}

export const CacheProvider = ({
  children,
  max = 100,
  ttl = 300,
}: CacheProviderProps) => {
  const cache = useRef(
    cacheManager.caching({
      store: 'memory',
      max,
      ttl,
    })
  );

  const cacheGet = useCallback(async function cacheGet<T>(
    cacheKey: string,
    func: () => Promise<T>
  ) {
    const result = await cache.current.get<T>(cacheKey);
    if (result) return result;
    const value = await func();
    await cache.current.set(cacheKey, value);
    return value;
  },
  []);

  return (
    <CacheContext.Provider value={{ cacheGet }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = () => {
  return useContext(CacheContext);
};
