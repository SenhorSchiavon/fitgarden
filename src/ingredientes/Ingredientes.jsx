import React, { useState } from 'react';

const Ingredientes = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [medida, setMedida] = useState('');
  const [categoria, setCategoria] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [editando, setEditando] = useState(false);
  const [ingredienteAtual, setIngredienteAtual] = useState(null);

  const categorias = ['Categoria 1', 'Categoria 2', 'Categoria 3']; // Substitua pelas suas categorias

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      const ingredientesAtualizados = ingredientes.map((ing) =>
        ing.id === ingredienteAtual.id
          ? { ...ingredienteAtual, nome, preco, medida, categoria }
          : ing
      );
      setIngredientes(ingredientesAtualizados);
      setEditando(false);
      setIngredienteAtual(null);
    } else {
      const novoIngrediente = { id: ingredientes.length + 1, nome, preco, medida, categoria };
      setIngredientes([...ingredientes, novoIngrediente]);
    }
    setNome('');
    setPreco('');
    setMedida('');
    setCategoria('');
  };

  const handleEdit = (ingrediente) => {
    setNome(ingrediente.nome);
    setPreco(ingrediente.preco);
    setMedida(ingrediente.medida);
    setCategoria(ingrediente.categoria);
    setEditando(true);
    setIngredienteAtual(ingrediente);
  };

  const handleDelete = (id) => {
    setIngredientes(ingredientes.filter(ingrediente => ingrediente.id !== id));
    if (editando && ingredienteAtual && ingredienteAtual.id === id) {
      setEditando(false);
      setIngredienteAtual(null);
      setNome('');
      setPreco('');
      setMedida('');
      setCategoria('');
    }
  };

  return (
    <div className="my-12 mx-10">
      <h1 className="text-3xl font-extrabold text-sky-600 text-center">Cadastrar Ingrediente</h1>
      <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit} className="mx-auto max-w-5xl flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Nome do Ingrediente"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço de Custo</label>
            <input
              type="number"
              id="preco"
              placeholder="Preço de Custo"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="medida" className="block text-sm font-medium text-gray-700">Medida</label>
            <select
              id="medida"
              value={medida}
              onChange={(e) => setMedida(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="UN">UN</option>
              <option value="KG">KG</option>
              <option value="L">L</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex justify-end px-2 mb-4">
            <button
              type="submit"
              className="bg-green-600 border border-gray-300 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none text-2xl"
            >
              {editando ? 'Atualizar Ingrediente' : 'Adicionar Ingrediente'}
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center mt-10">
        <div className="overflow-x-auto max-w-5xl w-full">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Nome</th>
                <th className="border border-gray-300 px-4 py-2">Preço de Custo</th>
                <th className="border border-gray-300 px-4 py-2">Medida</th>
                <th className="border border-gray-300 px-4 py-2">Categoria</th>
                <th className="border border-gray-300 px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {ingredientes.map((ingrediente) => (
                <tr key={ingrediente.id} className="even:bg-gray-100 odd:bg-white">
                  <td className="border border-gray-300 px-4 py-2">{ingrediente.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{ingrediente.nome}</td>
                  <td className="border border-gray-300 px-4 py-2">{ingrediente.preco}</td>
                  <td className="border border-gray-300 px-4 py-2">{ingrediente.medida}</td>
                  <td className="border border-gray-300 px-4 py-2">{ingrediente.categoria}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleEdit(ingrediente)}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(ingrediente.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Ingredientes;
