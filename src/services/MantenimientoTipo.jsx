export const searchMantenimientoTipo = async ({ query }) => {
  console.log('searchMantenimientoTipo query: ', query);
  if (!query) return [];

  try {
    const response = await fetch(`https://backalt.electrohuila.com.co:9071/laravel/public/api/mantenimientoTipo?ACTIVIDAD_TIPO_ID=${query}`);
    const json = await response.json();

    const data = json.data.map((item) => ({
      mant_tipo_id: item.mant_tipo_id,
      actividad_tipo_id: item.actividad_tipo_id,
      mant_act_id: item.mant_act_id,
      created_at: item.created_at,
      updated_at: item.updated_at,
      mant_tipo_descripcion: item.mant_tipo_descripcion,
    }));

    return data;
  } catch (error) {
    throw new Error('Error buscando los tipos de mantenimiento');
  }
};
