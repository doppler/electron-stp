import { useState, useEffect, useRef } from 'react';
import useDB from '../useDB';

type useFindAllArgs = {
  selector: {
    type: 'instructor' | 'student' | 'aircraft' | 'location' | 'jump';
  };
};

const useFindAll = (args: useFindAllArgs) => {
  const { find } = useDB();
  const selector = useRef(args);
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
