import { useRef, useState, useMemo, useCallback } from 'react';
import { searchMantenimientoTipo } from '../services/MantenimientoTipo';

export function useMantenimientoTipo({ search }) {
  console.log('init useMantenimientoTipo: ', search);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(false);

  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getMantenimientoTipo = async ({ search }) => {
    //if (search === previousSearch.current) return;
    console.log('previousSearch: ', previousSearch.current, 'search:', search);

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

  // El useCallback es para memorizar funciones haciendo mas facil su escritura en comparacion con useMemo...
  const getMantenimientoTipoCallBack = useCallback(async ({ search }) => {
    console.log('*** getMantenimientoTipoCallBack previousSearch: ', previousSearch.current, 'search:', search);

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
  }, []);

  const getMantenimientoTipoMemo = useMemo(() => {
    return async ({ search }) => {
      console.log('*** getMantenimientoTipoMemo previousSearch: ', previousSearch.current, 'search:', search);

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
  }, []);

  const orderedData = () => {
    console.log('*** orderedData: ');
    return [...data].sort((a, b) => b.mant_tipo_descripcion.localeCompare(a.mant_tipo_descripcion));
  };

  //Para memorizar valores computados
  const orderedDataMemo = useMemo(() => {
    console.log('*** orderedDataMemo: ');
    return [...data].sort((a, b) => b.mant_tipo_descripcion.localeCompare(a.mant_tipo_descripcion));
  }, [data]);

  const orderedSimple = [...data].sort((a, b) => b.mant_tipo_descripcion.localeCompare(a.mant_tipo_descripcion));

  return { data: orderedDataMemo, getMantenimientoTipo: getMantenimientoTipoCallBack, isLoading, error, isData };
}
