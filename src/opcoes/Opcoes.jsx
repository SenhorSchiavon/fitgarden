import React, { useState } from 'react';

const Opcoes = () => {
  const [tipo, setTipo] = useState('');
  const [nome, setNome] = useState('');
  const [id, setId] = useState('');
  const [categoria, setCategoria] = useState('');
  const [carboidrato, setCarboidrato] = useState('');
  const [porcentagemCarboidrato, setPorcentagemCarboidrato] = useState('');
  const [proteina, setProteina] = useState('');
  const [porcentagemProteina, setPorcentagemProteina] = useState('');
  const [legumes, setLegumes] = useState('');
  const [porcentagemLegumes, setPorcentagemLegumes] = useState('');
  const [opcoes, setOpcoes] = useState([]);
  const [editando, setEditando] = useState(false);
  const [opcaoAtual, setOpcaoAtual] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [carboidratos, setCarboidratos] = useState([
    { id: 1, nome: 'Arroz', porcentagem: 20 },
    { id: 2, nome: 'Macarrão', porcentagem: 15 },
  ]);
  const [proteinas, setProteinas] = useState([
    { id: 1, nome: 'Frango', porcentagem: 25 },
    { id: 2, nome: 'Carne', porcentagem: 30 },
  ]);
  const [legumesList, setLegumesList] = useState([
    { id: 1, nome: 'Brócolis', porcentagem: 10 },
    { id: 2, nome: 'Cenoura', porcentagem: 5 },
  ]);

  const validarPorcentagens = () => {
    const soma = Number(porcentagemCarboidrato) + Number(porcentagemProteina) + Number(porcentagemLegumes);
    return soma === 100;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tipo === 'MARMITAS FIT' && !validarPorcentagens()) {
      alert('A soma das porcentagens deve ser igual a 100.');
      return;
    }

    if (editando) {
      const opcoesAtualizadas = opcoes.map((opcao) =>
        opcao.id === opcaoAtual.id
          ? { ...opcaoAtual, tipo, nome, categoria, carboidrato, porcentagemCarboidrato, proteina, porcentagemProteina, legumes, porcentagemLegumes }
          : opcao
      );
      setOpcoes(opcoesAtualizadas);
      setEditando(false);
      setOpcaoAtual(null);
    } else {
      const novaOpcao = { id: opcoes.length + 1, tipo, nome, categoria, carboidrato, porcentagemCarboidrato, proteina, porcentagemProteina, legumes, porcentagemLegumes };
      setOpcoes([...opcoes, novaOpcao]);
    }
    setTipo('');
    setNome('');
    setId('');
    setCategoria('');
    setCarboidrato('');
    setPorcentagemCarboidrato('');
    setProteina('');
    setPorcentagemProteina('');
    setLegumes('');
    setPorcentagemLegumes('');
  };

  const handleEdit = (opcao) => {
    setTipo(opcao.tipo);
    setNome(opcao.nome);
    setId(opcao.id);
    setCategoria(opcao.categoria);
    setCarboidrato(opcao.carboidrato);
    setPorcentagemCarboidrato(opcao.porcentagemCarboidrato);
    setProteina(opcao.proteina);
    setPorcentagemProteina(opcao.porcentagemProteina);
    setLegumes(opcao.legumes);
    setPorcentagemLegumes(opcao.porcentagemLegumes);
    setEditando(true);
    setOpcaoAtual(opcao);
  };

  const handleDelete = (id) => {
    setOpcoes(opcoes.filter(opcao => opcao.id !== id));
    if (editando && opcaoAtual && opcaoAtual.id === id) {
      setEditando(false);
      setOpcaoAtual(null);
      setTipo('');
      setNome('');
      setId('');
      setCategoria('');
      setCarboidrato('');
      setPorcentagemCarboidrato('');
      setProteina('');
      setPorcentagemProteina('');
      setLegumes('');
      setPorcentagemLegumes('');
    }
  };

  const openModal = () => setModalAberto(true);
  const closeModal = () => setModalAberto(false);

  return (
    <div className="my-12 mx-10">
      <h1 className="text-3xl font-extrabold text-sky-600 text-center">Cadastrar Opção</h1>
      <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit} className="mx-auto max-w-5xl flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value);
                if (e.target.value !== 'MARMITAS FIT') {
                  setCategoria('');
                  setCarboidrato('');
                  setPorcentagemCarboidrato('');
                  setProteina('');
                  setPorcentagemProteina('');
                  setLegumes('');
                  setPorcentagemLegumes('');
                }
              }}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Selecione o Tipo</option>
              <option value="MARMITAS FIT">MARMITAS FIT</option>
              <option value="OUTROS">OUTROS</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Nome da Opção"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          {tipo === 'MARMITAS FIT' && (
            <>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
                <select
                  id="categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Selecione a Categoria</option>
                  <option value="FIT">FIT</option>
                  <option value="LOW CARB">LOW CARB</option>
                  <option value="VEGETARIANO">VEGETARIANO</option>
                  <option value="SOPA">SOPA</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium text-gray-700">Carboidrato</label>
                <button
                  type="button"
                  onClick={openModal}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-blue-600 text-white"
                >
                  Selecionar Carboidrato
                </button>
                <input
                  type="text"
                  id="carboidrato"
                  value={carboidrato}
                  onChange={(e) => setCarboidrato(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  readOnly
                />
                <label htmlFor="porcentagemCarboidrato" className="block text-sm font-medium text-gray-700">Porcentagem de Carboidrato</label>
                <input
                  type="number"
                  id="porcentagemCarboidrato"
                  value={porcentagemCarboidrato}
                  onChange={(e) => setPorcentagemCarboidrato(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium text-gray-700">Proteína</label>
                <button
                  type="button"
                  onClick={openModal}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-blue-600 text-white"
                >
                  Selecionar Proteína
                </button>
                <input
                  type="text"
                  id="proteina"
                  value={proteina}
                  onChange={(e) => setProteina(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  readOnly
                />
                <label htmlFor="porcentagemProteina" className="block text-sm font-medium text-gray-700">Porcentagem de Proteína</label>
                <input
                  type="number"
                  id="porcentagemProteina"
                  value={porcentagemProteina}
                  onChange={(e) => setPorcentagemProteina(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium text-gray-700">Legumes</label>
                <button
                  type="button"
                  onClick={openModal}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-blue-600 text-white"
                >
                  Selecionar Legumes
                </button>
                <input
                  type="text"
                  id="legumes"
                  value={legumes}
                  onChange={(e) => setLegumes(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  readOnly
                />
                <label htmlFor="porcentagemLegumes" className="block text-sm font-medium text-gray-700">Porcentagem de Legumes</label>
                <input
                  type="number"
                  id="porcentagemLegumes"
                  value={porcentagemLegumes}
                  onChange={(e) => setPorcentagemLegumes(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
            </>
          )}
          <div className="w-full px-2 mb-4">
            <button
              type="submit"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-green-600 text-white"
            >
              {editando ? 'Atualizar Opção' : 'Adicionar Opção'}
            </button>
          </div>
        </form>
      </div>

      <div className="my-12 mx-10">
        <h1 className="text-2xl font-extrabold text-sky-600 text-center">Lista de Opções</h1>
        <table className="min-w-full divide-y divide-gray-200 mt-8">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {opcoes.map((opcao) => (
              <tr key={opcao.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{opcao.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{opcao.tipo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{opcao.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{opcao.categoria}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(opcao)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(opcao.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de seleção */}
      {modalAberto && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Selecionar Item</h2>
            <div className="flex justify-between mb-4">
              <button onClick={() => setModalAberto(false)} className="text-blue-600 hover:text-blue-900">Fechar</button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium">Carboidratos</h3>
                <ul>
                  {carboidratos.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setCarboidrato(item.nome);
                          setPorcentagemCarboidrato(item.porcentagem);
                          closeModal();
                        }}
                        className="block w-full text-left py-2 px-4 hover:bg-gray-200"
                      >
                        {item.nome} - {item.porcentagem}%
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-md font-medium">Proteínas</h3>
                <ul>
                  {proteinas.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setProteina(item.nome);
                          setPorcentagemProteina(item.porcentagem);
                          closeModal();
                        }}
                        className="block w-full text-left py-2 px-4 hover:bg-gray-200"
                      >
                        {item.nome} - {item.porcentagem}%
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-md font-medium">Legumes</h3>
                <ul>
                  {legumesList.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setLegumes(item.nome);
                          setPorcentagemLegumes(item.porcentagem);
                          closeModal();
                        }}
                        className="block w-full text-left py-2 px-4 hover:bg-gray-200"
                      >
                        {item.nome} - {item.porcentagem}%
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Opcoes;
