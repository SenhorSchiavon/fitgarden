import React, { useState } from 'react';

const Preparos = () => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [preco, setPreco] = useState('');
  const [medida, setMedida] = useState('UN');
  const [preparos, setPreparos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [preparoAtual, setPreparoAtual] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [ingredientes, setIngredientes] = useState([
    { id: 1, nome: 'Tomate', medida: 'KG' },
    { id: 2, nome: 'Cebola', medida: 'UN' },
    { id: 3, nome: 'Alho', medida: 'UN' },
    // Adicione mais ingredientes conforme necessário
  ]);
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);
  const [quantidade, setQuantidade] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoPreparo = {
      id: preparos.length + 1,
      nome,
      tipo,
      preco,
      medida,
      ingredientes: ingredientesSelecionados.map(ing => ({ ...ing, quantidade: quantidade[ing.id] || 0 }))
    };

    if (editando) {
      const preparosAtualizados = preparos.map((preparo) =>
        preparo.id === preparoAtual.id
          ? { ...preparoAtual, ...novoPreparo }
          : preparo
      );
      setPreparos(preparosAtualizados);
      setEditando(false);
      setPreparoAtual(null);
    } else {
      setPreparos([...preparos, novoPreparo]);
    }

    // Limpar os campos após a submissão
    setNome('');
    setTipo('');
    setPreco('');
    setMedida('UN');
    setIngredientesSelecionados([]);
    setQuantidade({});
  };

  const handleEdit = (preparo) => {
    setNome(preparo.nome);
    setTipo(preparo.tipo);
    setPreco(preparo.preco);
    setMedida(preparo.medida);
    setEditando(true);
    setPreparoAtual(preparo);
    setIngredientesSelecionados(preparo.ingredientes || []);
    setQuantidade(preparo.ingredientes.reduce((acc, ing) => ({ ...acc, [ing.id]: ing.quantidade }), {}));
  };

  const handleDelete = (id) => {
    setPreparos(preparos.filter(preparo => preparo.id !== id));
    if (editando && preparoAtual && preparoAtual.id === id) {
      setEditando(false);
      setPreparoAtual(null);
      setNome('');
      setTipo('');
      setPreco('');
      setMedida('UN');
      setIngredientesSelecionados([]);
      setQuantidade({});
    }
  };

  const openModal = () => {
    setModalAberto(true);
  };

  const closeModal = () => {
    setModalAberto(false);
  };

  const toggleIngredienteSelecionado = (ingrediente) => {
    setIngredientesSelecionados((prev) =>
      prev.some((i) => i.id === ingrediente.id)
        ? prev.filter((i) => i.id !== ingrediente.id)
        : [...prev, ingrediente]
    );
  };

  const handleQuantidadeChange = (id, value) => {
    setQuantidade((prev) => ({ ...prev, [id]: value }));
  };

  const handleConfirmarIngredientes = () => {
    closeModal();
    // Apenas para garantir que os dados no estado estejam corretos
    setQuantidade((prev) => {
      const updatedQuantidade = { ...prev };
      ingredientesSelecionados.forEach(ing => {
        if (!(ing.id in updatedQuantidade)) {
          updatedQuantidade[ing.id] = 0;
        }
      });
      return updatedQuantidade;
    });
  };

  return (
    <div className="my-12 mx-10">
      <h1 className="text-3xl font-extrabold text-sky-600 text-center">Cadastrar Preparo</h1>
      <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit} className="mx-auto max-w-5xl flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Nome do Preparo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</label>
            <input
              type="text"
              id="tipo"
              placeholder="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
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
          <div className="w-full flex justify-end px-2 mb-4">
            <button
              type="submit"
              className="bg-green-600 border border-gray-300 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none text-2xl"
            >
              {editando ? 'Atualizar Preparo' : 'Adicionar Preparo'}
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={openModal}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Adicionar Ingredientes
        </button>
      </div>
      <div className="flex flex-wrap justify-center mt-10">
        {ingredientesSelecionados.map((ingrediente) => (
          <div key={ingrediente.id} className="border border-gray-300 p-4 m-2 rounded shadow-md">
            <h3 className="text-lg font-semibold">{ingrediente.nome}</h3>
            <p>Quantidade: {quantidade[ingrediente.id] || 0} {ingrediente.medida}</p>
          </div>
        ))}
      </div>
      {modalAberto && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Escolha Ingredientes</h2>
            <div className="max-h-60 overflow-y-auto">
              {ingredientes.map((ingrediente) => (
                <div key={ingrediente.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={ingredientesSelecionados.some((i) => i.id === ingrediente.id)}
                    onChange={() => toggleIngredienteSelecionado(ingrediente)}
                    className="mr-2"
                  />
                  <label className="flex-1">{ingrediente.nome}</label>
                  {ingredientesSelecionados.some((i) => i.id === ingrediente.id) && (
                    <input
                      type="number"
                      placeholder="Quantidade"
                      value={quantidade[ingrediente.id] || ''}
                      onChange={(e) => handleQuantidadeChange(ingrediente.id, e.target.value)}
                      className="border border-gray-300 p-1 rounded"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2"
              >
                Fechar
              </button>
              <button
                onClick={handleConfirmarIngredientes}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-10">
        <div className="overflow-x-auto max-w-5xl w-full">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Nome</th>
                <th className="border border-gray-300 px-4 py-2">Quantidade</th>
                <th className="border border-gray-300 px-4 py-2">Medida</th>
                <th className="border border-gray-300 px-4 py-2">Preço de Custo</th>
                <th className="border border-gray-300 px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {preparos.map((preparo) => (
                <tr key={preparo.id} className="even:bg-gray-100 odd:bg-white">
                  <td className="border border-gray-300 px-4 py-2">{preparo.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{preparo.nome}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {preparo.ingredientes.map((ing) => (
                      <div key={ing.id}>{ing.nome}: {ing.quantidade} {ing.medida}</div>
                    ))}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{preparo.medida}</td>
                  <td className="border border-gray-300 px-4 py-2">{preparo.preco}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleEdit(preparo)}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(preparo.id)}
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
};

export default Preparos;
