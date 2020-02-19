import { useState, useEffect } from 'react';
import useDB from '../useDB';

const useFindAll = (selector: any) => {
  const { find } = useDB();
  const [results, setResults] = useState<any>([]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      const dbResults = await find(selector.current);
      if (!abortController.signal.aborted) setResults(dbResults);
    })();
    return () => abortController.abort();
  }, [find, selector]);
  return results;
};

export default useFindAll;
