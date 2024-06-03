"use client"

import { useState, useEffect } from 'react';


const AgregarIngrediente = () => {
  const [ingrediente, setIngrediente] = useState({
    nombre: '',
    categoria: '',
    sabor: '',
    textura: '',
    compatibilidad: [],
    picor: null,
    solidos: 0,
    agua: 0,
    costo: 0,
  });

  const [allowedValues, setAllowedValues] = useState({
    categorias: [],
    texturas: [],
    sabores: [],
  });

  useEffect(() => {
    const fetchAllowedValues = async () => {
      try {
        const response = await fetch('/api/ingredientes/allowed-values'); 
        if (!response.ok) {
          throw new Error('Error al obtener los valores permitidos');
        }
        const data = await response.json();
        setAllowedValues(data);
        
        setIngrediente({
          ...ingrediente,
          categoria: data.categorias[0],
          sabor: data.sabores[0],
          textura: data.texturas[0],
        });
      } catch (error) {
        console.error('Error al obtener los valores permitidos:', error);
      }
    };
  
    fetchAllowedValues();
  }, []);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIngrediente({ ...ingrediente, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    console.log('Submitting ingredient:', ingrediente); 
    try {
      console.log('Sending fetch request'); 
      const response = await fetch('http://localhost:3000/api/ingredientes/postingrediente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingrediente), 
      });
  
      console.log('Fetch response received'); 
      if (response.ok) {
        console.log('Ingrediente agregado con éxito'); 
        alert('Ingrediente agregado con éxito'); 
      } else {
        console.log('Error al agregar ingrediente:', response.status); 
        alert('Error al agregar ingrediente'); 
      }
    } catch (error) {
      console.error('Error al agregar ingrediente:', error); 
      alert('Error al agregar ingrediente'); 
    }
  };
  
  

  return (
   
    <div className='flex flex-col gap-6 m-6'>
      <h1>Agregar Ingrediente</h1>
      <form onSubmit={handleSubmit}>
        <label className='flex flex-col gap-6 m-6'>
          Nombre:
          <input type="text" name="nombre" value={ingrediente.nombre} onChange={handleChange} required />
        </label>
        <label className='flex flex-col gap-6 m-6'>
          Categoría:
          <select name="categoria" value={ingrediente.categoria} onChange={handleChange} required>
            {allowedValues.categorias.map(categoria => (
              <option key={categoria} value={categoria}>{categoria}</option>
            ))}
          </select>
        </label>
        <label className='flex flex-col gap-6 m-6'>
          Sabor:
          <select name="sabor" value={ingrediente.sabor} onChange={handleChange} required>
            {allowedValues.sabores.map(sabor => (
              <option key={sabor} value={sabor}>{sabor}</option>
            ))}
          </select>
        </label>
        <label className='flex flex-col gap-6 m-6'>
          Textura:
          <select name="textura" value={ingrediente.textura} onChange={handleChange} required>
            {allowedValues.texturas.map(textura => (
              <option key={textura} value={textura}>{textura}</option>
            ))}
          </select>
        </label>
        <label className='flex flex-col gap-6 m-6'>
          Compatibilidad con otros ingredientes:
          <input type="text" name="compatibilidad" value={ingrediente.compatibilidad} onChange={handleChange} />
        </label>
        <label className='flex flex-col gap-6 m-6'>
          Picor en % (1 a 100):
          <input type="number" name="picor" value={ingrediente.picor || ''} onChange={handleChange} />
        </label>
        <label className='flex flex-col gap-6 m-6'>
          % de sólidos:
          <input type="number" name="solidos" value={ingrediente.solidos} onChange={handleChange} required />
        </label>
        <label className='flex flex-col gap-6 m-6'>
          % de agua:
          <input type="number" name="agua" value={ingrediente.agua} onChange={handleChange} required />
        </label>
        <label className='flex flex-col gap-6 m-6'>
          Costo por kg:
          <input type="number" name="costo" value={ingrediente.costo} onChange={handleChange} required />
        </label>
        <button type="submit">Agrega tu nuevo Ingrediente</button>
      </form>
    </div>
   
  );
};

export default AgregarIngrediente;
