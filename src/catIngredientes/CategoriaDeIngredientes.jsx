import { useRef, useEffect, useState } from "react";

const CategoriaDeIngredientes = () => {
    const ref = useRef(null);
    const [categoria, setCategoria] = useState("");
    const [categorias, setCategorias] = useState([
        { id: 1, nome: "Fruta" },
        // Adicione mais categorias conforme necessário
    ]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const novaCategoria = {
            id: categorias.length + 1,
            nome: categoria
        };
        setCategorias([...categorias, novaCategoria]);
        setCategoria("");
    };

    const handleChangeNomeCategoria = (event) => {
        setCategoria(event.target.value);
    };

    const handleDelete = (id) => {
        setCategorias(categorias.filter(categoria => categoria.id !== id));
    };

    return (
        <div className="my-12">
            <h1 className="text-3xl font-extrabold text-sky-600 text-center">Cadastrar Categoria</h1>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="mx-auto max-w-5xl flex flex-col md:w-1/3 mt-10 justify-center">
                    <div className="flex flex-col justify-center">
                        <div className="flex">
                            <input 
                                type="text" 
                                placeholder="Nome da categoria" 
                                value={categoria}
                                onChange={handleChangeNomeCategoria}
                                className="border border-gray-300 rounded-l px-4 py-2 w-full bg-gray-100 focus:bg-white focus:outline-none"
                            />
                            <button 
                                type="submit"
                                className="bg-green-600 border border-gray-300 text-white px-4 py-2 rounded-r hover:bg-green-700 focus:outline-none text-2xl"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex justify-center mt-10">
                <div className="overflow-x-auto max-w-5xl w-full md:w-1/3">
                    <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">ID</th>
                                <th className="border border-gray-300 px-4 py-2">Categoria</th>
                                <th className="border border-gray-300 px-4 py-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {categorias.map((categoria) => (
                                <tr key={categoria.id} className="even:bg-gray-100 odd:bg-white">
                                    <td className="border border-gray-300 px-4 py-2">{categoria.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{categoria.nome}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => handleDelete(categoria.id)}
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

export default CategoriaDeIngredientes;
