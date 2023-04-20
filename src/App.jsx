import { useState } from 'react';

import response from './mocs/mantenimientoTipo.json';
import './App.css';

function App() {
  const isData = response?.data.length > 0;
  console.log('isData: ', isData);

  return (
    <div className='page'>
      <header>
        <h1>Mi buscador</h1>
      </header>
      <main>
        <form>
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
