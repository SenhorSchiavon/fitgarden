import React, { useState } from 'react';

const tamanhosDisponiveis = ['200g', '300g', '400g', '500g'];

const TamanhosValores = () => {
  const [pesagem, setPesagem] = useState('');
  const [valores, setValores] = useState({
    unitario: '',
    acimaDe10: '',
    acimaDe20: '',
    acimaDe40: ''
  });
  const [tamanhos, setTamanhos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [tamanhoAtual, setTamanhoAtual] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoTamanho = { id: tamanhos.length + 1, pesagem, valores };
    if (editando) {
      const tamanhosAtualizados = tamanhos.map((tamanho) =>
        tamanho.id === tamanhoAtual.id ? novoTamanho : tamanho
      );
      setTamanhos(tamanhosAtualizados);
      setEditando(false);
      setTamanhoAtual(null);
    } else {
      setTamanhos([...tamanhos, novoTamanho]);
    }
    setPesagem('');
    setValores({ unitario: '', acimaDe10: '', acimaDe20: '', acimaDe40: '' });
  };

  const handleEdit = (tamanho) => {
    setPesagem(tamanho.pesagem);
    setValores(tamanho.valores);
    setEditando(true);
    setTamanhoAtual(tamanho);
  };

  const handleDelete = (id) => {
    setTamanhos(tamanhos.filter((tamanho) => tamanho.id !== id));
    if (editando && tamanhoAtual && tamanhoAtual.id === id) {
      setEditando(false);
      setTamanhoAtual(null);
      setPesagem('');
      setValores({ unitario: '', acimaDe10: '', acimaDe20: '', acimaDe40: '' });
    }
  };

  return (
    <div className="my-12 mx-10">
      <h1 className="text-3xl font-extrabold text-sky-600 text-center">Gerenciar Tamanhos e Valores</h1>
      <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit} className="mx-auto max-w-5xl flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="pesagem" className="block text-sm font-medium text-gray-700">Pesagem</label>
            <select
              id="pesagem"
              value={pesagem}
              onChange={(e) => setPesagem(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Selecione o tamanho</option>
              {tamanhosDisponiveis.map((tamanho) => (
                <option key={tamanho} value={tamanho}>{tamanho}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Valores</label>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="unitario" className="block text-sm font-medium text-gray-700">Unitário</label>
                <input
                  type="number"
                  id="unitario"
                  placeholder="0.000"
                  value={valores.unitario}
                  onChange={(e) => setValores({ ...valores, unitario: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  step="0.001"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="acimaDe10" className="block text-sm font-medium text-gray-700">Acima de 10 Unidades</label>
                <input
                  type="number"
                  id="acimaDe10"
                  placeholder="0.000"
                  value={valores.acimaDe10}
                  onChange={(e) => setValores({ ...valores, acimaDe10: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  step="0.001"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="acimaDe20" className="block text-sm font-medium text-gray-700">Acima de 20 Unidades</label>
                <input
                  type="number"
                  id="acimaDe20"
                  placeholder="0.000"
                  value={valores.acimaDe20}
                  onChange={(e) => setValores({ ...valores, acimaDe20: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  step="0.001"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="acimaDe40" className="block text-sm font-medium text-gray-700">Acima de 40 Unidades</label>
                <input
                  type="number"
                  id="acimaDe40"
                  placeholder="0.000"
                  value={valores.acimaDe40}
                  onChange={(e) => setValores({ ...valores, acimaDe40: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  step="0.001"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end px-2 mb-4">
            <button
              type="submit"
              className="bg-green-600 border border-gray-300 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none text-2xl"
            >
              {editando ? 'Atualizar Tamanho' : 'Adicionar Tamanho'}
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
                <th className="border border-gray-300 px-4 py-2">Pesagem</th>
                <th className="border border-gray-300 px-4 py-2">Unitário</th>
                <th className="border border-gray-300 px-4 py-2">Acima de 10</th>
                <th className="border border-gray-300 px-4 py-2">Acima de 20</th>
                <th className="border border-gray-300 px-4 py-2">Acima de 40</th>
                <th className="border border-gray-300 px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {tamanhos.map((tamanho) => (
                <tr key={tamanho.id} className="even:bg-gray-100 odd:bg-white">
                  <td className="border border-gray-300 px-4 py-2">{tamanho.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{tamanho.pesagem}</td>
                  <td className="border border-gray-300 px-4 py-2">{tamanho.valores.unitario}</td>
                  <td className="border border-gray-300 px-4 py-2">{tamanho.valores.acimaDe10}</td>
                  <td className="border border-gray-300 px-4 py-2">{tamanho.valores.acimaDe20}</td>
                  <td className="border border-gray-300 px-4 py-2">{tamanho.valores.acimaDe40}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleEdit(tamanho)}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(tamanho.id)}
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

export default TamanhosValores;
