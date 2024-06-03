import React from 'react';



import Link from 'next/link';

const Admin = () => {
  return (
    <div >
      <div><h1>AdminPanel</h1></div>
      <ul>
        <li>
          <Link href="/admin/agregarIngrediente">Agregar Ingrediente</Link>
        </li>
        <li>
          <Link href="/admin/agregarReceta">Agregar Receta</Link>
        </li>
      </ul>
    </div>
  );
};

export default Admin;
