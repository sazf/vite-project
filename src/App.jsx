import response from './mocs/mantenimientoTipo.json';
import './App.css';

import { useMantenimientoTipo } from './hooks/useMantenimientoTipo';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');

  const { data, getMantenimientoTipo, isLoading, isData } = useMantenimientoTipo({ search });

  const handleSubmit = (e) => {
    e.preventDefault();
    getMantenimientoTipo({ search });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className='page'>
      <header>
        <h1>Mi buscador</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='codigo' onChange={handleSearchChange} value={search} />

          <button type='submit'>Buscar</button>
        </form>
        {isLoading && <p>Cargando...</p>}
        <div className='results'>
          <ul>{isData && data.map((item) => <li key={item.mant_tipo_id}>{item.mant_tipo_descripcion}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

export default App;
