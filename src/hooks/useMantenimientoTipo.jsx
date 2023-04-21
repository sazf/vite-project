import { useRef, useState, useMemo, useCallback } from 'react';
import { searchMantenimientoTipo } from '../services/MantenimientoTipo';

export function useMantenimientoTipo({ search }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getMantenimientoTipo = async ({ search }) => {
    console.log('getMantenimientoTipo search: ', search);
    //if (search === previousSearch.current) return;
    console.log('previousSearch.current: ', previousSearch.current);

    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;

      const result = await searchMantenimientoTipo({ query: search });
      console.log('result: ', result);

      setData(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, getMantenimientoTipo, loading, error };
}
