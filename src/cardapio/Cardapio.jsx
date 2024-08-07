import React, { useState } from 'react';

const Cardapios = () => {
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [cardapios, setCardapios] = useState([]);
  const [editando, setEditando] = useState(false);
  const [cardapioAtual, setCardapioAtual] = useState(null);
  const [refeicoes, setRefeicoes] = useState([
    { id: 1, nome: 'Feijoada', categoria: 'Tradicional', ativo: false },
    { id: 2, nome: 'Salada Caesar', categoria: 'Fit', ativo: false },
    { id: 3, nome: 'Lasanha', categoria: 'Tradicional', ativo: false },
    // Adicione mais refeições conforme necessário
  ]);
  const [pesquisa, setPesquisa] = useState('');
  const [resumoModalAberto, setResumoModalAberto] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const refeicoesSelecionadas = refeicoes.filter((refeicao) => refeicao.ativo);
    if (refeicoesSelecionadas.length === 0) {
      alert('Selecione pelo menos uma refeição.');
      return;
    }
    setResumoModalAberto(true);
  };

  const handleSave = () => {
    if (editando) {
      const cardapiosAtualizados = cardapios.map((cardapio) =>
        cardapio.id === cardapioAtual.id ? { ...cardapioAtual, nome, codigo, refeicoes } : cardapio
      );
      setCardapios(cardapiosAtualizados);
      setEditando(false);
      setCardapioAtual(null);
    } else {
      const novoCardapio = { id: cardapios.length + 1, nome, codigo, refeicoes };
      setCardapios([...cardapios, novoCardapio]);
    }
    setNome('');
    setCodigo('');
    setRefeicoes(refeicoes.map((refeicao) => ({ ...refeicao, ativo: false })));
    setResumoModalAberto(false);
  };

  const handleEdit = (cardapio) => {
    setNome(cardapio.nome);
    setCodigo(cardapio.codigo);
    setEditando(true);
    setCardapioAtual(cardapio);
    setRefeicoes(cardapio.refeicoes);
  };

  const handleDelete = (id) => {
    setCardapios(cardapios.filter((cardapio) => cardapio.id !== id));
    if (editando && cardapioAtual && cardapioAtual.id === id) {
      setEditando(false);
      setCardapioAtual(null);
      setNome('');
      setCodigo('');
      setRefeicoes(refeicoes.map((refeicao) => ({ ...refeicao, ativo: false })));
    }
  };

  const toggleRefeicaoAtiva = (id) => {
    setRefeicoes((prev) =>
      prev.map((refeicao) => (refeicao.id === id ? { ...refeicao, ativo: !refeicao.ativo } : refeicao))
    );
  };

  const filtrarRefeicoes = (refeicoes, pesquisa) => {
    return refeicoes.filter((refeicao) =>
      refeicao.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );
  };

  return (
    <div className="my-12 mx-10">
      <h1 className="text-3xl font-extrabold text-sky-600 text-center">Cadastrar Cardápio</h1>
      <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit} className="mx-auto max-w-5xl flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Nome do Cardápio"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código</label>
            <input
              type="text"
              id="codigo"
              placeholder="Código do Cardápio"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="w-full px-2 mb-4">
            <label htmlFor="pesquisa" className="block text-sm font-medium text-gray-700">Pesquisar Refeições</label>
            <input
              type="text"
              id="pesquisa"
              placeholder="Pesquisar"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="w-full px-2 mb-4">
            <div className="overflow-x-auto max-w-5xl w-full">
              <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Selecionar</th>
                    <th className="border border-gray-300 px-4 py-2">Nome</th>
                    <th className="border border-gray-300 px-4 py-2">Categoria</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filtrarRefeicoes(refeicoes, pesquisa).map((refeicao) => (
                    <tr key={refeicao.id} className="even:bg-gray-100 odd:bg-white">
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="checkbox"
                          checked={refeicao.ativo}
                          onChange={() => toggleRefeicaoAtiva(refeicao.id)}
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{refeicao.nome}</td>
                      <td className="border border-gray-300 px-4 py-2">{refeicao.categoria}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full flex justify-end px-2 mb-4">
            <button
              type="submit"
              className="bg-green-600 border border-gray-300 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none text-2xl"
            >
              {editando ? 'Atualizar Cardápio' : 'Adicionar Cardápio'}
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
                <th className="border border-gray-300 px-4 py-2">Ativo</th>
                <th className="border border-gray-300 px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {cardapios.map((cardapio) => (
                <tr key={cardapio.id} className="even:bg-gray-100 odd:bg-white">
                  <td className="border border-gray-300 px-4 py-2">{cardapio.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{cardapio.nome}</td>
                  <td className="border border-gray-300 px-4 py-2">{cardapio.ativo ? 'Sim' : 'Não'}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleEdit(cardapio)}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(cardapio.id)}
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

      {resumoModalAberto && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
            <h2 className="text-xl font-bold mb-4">Resumo das Opções Selecionadas</h2>
            <div className="overflow-auto max-h-64">
              {refeicoes.filter((refeicao) => refeicao.ativo).length > 0 ? (
                Object.entries(
                  refeicoes
                    .filter((refeicao) => refeicao.ativo)
                    .reduce((acc, refeicao) => {
                      if (!acc[refeicao.categoria]) acc[refeicao.categoria] = [];
                      acc[refeicao.categoria].push(refeicao);
                      return acc;
                    }, {})
                ).map(([categoria, refeicoesCategoria]) => (
                  <div key={categoria} className="mb-4">
                    <h3 className="text-lg font-bold">{categoria}</h3>
                    <ul className="list-disc list-inside">
                      {refeicoesCategoria.map((refeicao) => (
                        <li key={refeicao.id}>{refeicao.nome}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>Nenhuma opção selecionada.</p>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setResumoModalAberto(false)}
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2"
              >
                Fechar
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none"
              >
                Salvar Cardápio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cardapios;
