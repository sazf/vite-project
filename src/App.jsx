import response from './mocs/mantenimientoTipo.json';
import './App.css';

import { useMantenimientoTipo } from './hooks/useMantenimientoTipo';

function App() {
  const isData = response?.data.length > 0;
  console.log('isData: ', isData);

  const search = 'MTTO_PIMP';

  const { data, getMantenimientoTipo, loading } = useMantenimientoTipo({ search });
  console.log('loading: ', loading);
  console.log('data: ', data);

  const handleSubmit = (e) => {
    e.preventDefault();
    getMantenimientoTipo({ search });
    console.log('e: ', e);
  };

  return (
    <div className='page'>
      <header>
        <h1>Mi buscador</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='codigo' />
          <button type='submit'>Buscar</button>
        </form>
        <div className='results'>
          <ul>{isData && response.data.map((item) => <li key={item.mant_tipo_id}>{item.mant_tipo_descripcion}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

export default App;
