import { useState, useEffect } from 'react';
import useDB from '../useDB';

type useFindAllArg = {
  selector: {
    type: 'instructor' | 'student' | 'aircraft' | 'location' | 'jump';
  };
};
const useFindAll = (selector: useFindAllArg) => {
  const { find } = useDB();
  const [results, setResults] = useState<any>([]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      const dbResults = await find(selector);
      if (!abortController.signal.aborted) setResults(dbResults);
    })();
    return () => abortController.abort();
  }, [find, selector]);
  return results;
};

export default useFindAll;
