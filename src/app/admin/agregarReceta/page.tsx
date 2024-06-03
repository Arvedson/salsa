"use client"

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

const AgregarRecetaPage = () => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [origen, setOrigen] = useState('');
  const [nivelDePicante, setNivelDePicante] = useState('');
  const [uso, setUso] = useState('');
  const [textura, setTextura] = useState('');
  const [ingredientes, setIngredientes] = useState([{ ingrediente: '', cantidad: 0, categoria: '' }]);
  const [tipos, setTipos] = useState<string[]>([]);
  const [nivelesDePicante, setNivelesDePicante] = useState<string[]>([]);
  const [usos, setUsos] = useState<string[]>([]);
  const [texturas, setTexturas] = useState<string[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);

  useEffect(() => {
    const fetchValores = async () => {
      const response = await fetch('/api/receta/valores');
      const data = await response.json();
      setTipos(data.tipos);
      setNivelesDePicante(data.nivelDePicante);
      setUsos(data.usos);
      setTexturas(data.texturas);
      setCategorias(data.categorias);
    };

    fetchValores();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value } = e.target;

    if (name === 'ingrediente' || name === 'cantidad' || name === 'categoria') {
      const updatedIngredientes = [...ingredientes];
      if (index !== undefined) {
        updatedIngredientes[index] = {
          ...updatedIngredientes[index],
          [name]: name === 'cantidad' ? Number(value) : value,
        };
      }
      setIngredientes(updatedIngredientes);
    } else {
      switch (name) {
        case 'nombre':
          setNombre(value);
          break;
        case 'tipo':
          setTipo(value);
          break;
        case 'origen':
          setOrigen(value);
          break;
        case 'nivelDePicante':
          setNivelDePicante(value);
          break;
        case 'uso':
          setUso(value);
          break;
        case 'textura':
          setTextura(value);
          break;
      }
    }
  };

  const handleAddIngrediente = () => {
    setIngredientes([...ingredientes, { ingrediente: '', cantidad: 0, categoria: '' }]);
  };

  const handleRemoveIngrediente = (index: number) => {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const nuevaReceta = {
      nombre,
      tipo,
      origen,
      nivelDePicante,
      uso,
      textura,
      ingredientes,
    };

    const response = await fetch('/api/receta/postrecetas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaReceta),
    });

    if (response.ok) {
      alert('Receta agregada exitosamente');
    } else {
      alert('Hubo un error al agregar la receta');
    }
  };

  return (
    <div className='flex flex-col gap-6 m-6'>
      <h1>Agregar Receta</h1>
      <form  onSubmit={handleSubmit}>
        <div className='flex flex-col gap-6 m-6'>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={nombre} onChange={handleChange} required />
        </div>
        <div className='flex flex-col gap-6 m-6'>
          <label>Tipo:</label>
          <select name="tipo" value={tipo} onChange={handleChange} required>
            <option value="">Seleccione...</option>
            {tipos.map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>
        <div className='flex flex-col gap-6 m-6'>
          <label>Origen:</label>
          <input type="text" name="origen" value={origen} onChange={handleChange} required />
        </div>
        <div className='flex flex-col gap-6 m-6'>
          <label>Nivel de Picante:</label>
          <select name="nivelDePicante" value={nivelDePicante} onChange={handleChange} required>
            <option value="">Seleccione...</option>
            {nivelesDePicante.map((nivel) => (
              <option key={nivel} value={nivel}>{nivel}</option>
            ))}
          </select>
        </div>
        <div className='flex flex-col gap-6 m-6'>
          <label>Uso:</label>
          <select name="uso" value={uso} onChange={handleChange} required>
            <option value="">Seleccione...</option>
            {usos.map((uso) => (
              <option key={uso} value={uso}>{uso}</option>
            ))}
          </select>
        </div>
        <div className='flex flex-col gap-6 m-6'>
          <label>Textura:</label>
          <select name="textura" value={textura} onChange={handleChange} required>
            <option value="">Seleccione...</option>
            {texturas.map((textura) => (
              <option key={textura} value={textura}>{textura}</option>
            ))}
          </select>
        </div>
        <div className='flex flex-col gap-6 m-6'>
          <h3>Ingredientes</h3>
          {ingredientes.map((ingrediente, index) => (
            <div key={index} className='flex flex-col gap-6 m-6'>
              <label>Ingrediente:</label>
              <input
                type="text"
                name="ingrediente"
                value={ingrediente.ingrediente}
                onChange={(e) => handleChange(e, index)}
                required
              />
              <label>Cantidad:</label>
              <input
                type="number"
                name="cantidad"
                value={ingrediente.cantidad}
                onChange={(e) => handleChange(e, index)}
                required
              />
              <label>Categoría:</label>
              <select
                name="categoria"
                value={ingrediente.categoria}
                onChange={(e) => handleChange(e, index)}
                required
              >
                <option value="">Seleccione...</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </select>
              <button type="button" onClick={() => handleRemoveIngrediente(index)}>Eliminar</button>
            </div>
          ))}
          <button  type="button" onClick={handleAddIngrediente}>Agregar Ingrediente</button>
        </div>
        <button type="submit">Agregar Receta</button>
      </form>
    </div>
    
  );
};

export default AgregarRecetaPage;
