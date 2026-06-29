import { useCallback, useEffect, useState } from 'react';

// Generic data-fetching hook with loading/error/refetch + optional fallback.
// Pass `fallback` to keep the UI populated when the API is unreachable
// (useful while you're still wiring screens up).
export function useApi(fn, deps = [], { fallback } = {}) {
  const [data, setData] = useState(fallback ?? null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fn();
      setData(res);
    } catch (e) {
      setError(e);
      if (fallback !== undefined) setData(fallback);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { refetch(); }, [refetch]);

  return { data, loading, error, refetch, setData };
}

export default useApi;
