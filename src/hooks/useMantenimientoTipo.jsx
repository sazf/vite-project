import { useRef, useState, useMemo, useCallback } from 'react';
import { searchMantenimientoTipo } from '../services/MantenimientoTipo';

export function useMantenimientoTipo({ search }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(false);

  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getMantenimientoTipo = async ({ search }) => {
    //if (search === previousSearch.current) return;
    console.log('previousSearch.current: ', previousSearch.current, search);

    try {
      setIsLoading(true);
      setError(null);
      previousSearch.current = search;

      const result = await searchMantenimientoTipo({ query: search });

      setData(result);
      setIsData(result.length > 0);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, getMantenimientoTipo, isLoading, error, isData };
}
