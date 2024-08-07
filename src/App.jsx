import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar.jsx';
import Home from './home/Home.jsx';
import CategoriaDeIngredientes from './catIngredientes/CategoriaDeIngredientes.jsx';
import Ingredientes from './ingredientes/Ingredientes.jsx';
import Preparos from './preparo/Preparos.jsx';
import Opcoes from './opcoes/Opcoes.jsx';
import Cardapios from './cardapio/Cardapio.jsx';
import TamanhosValores from './valores/Valores.jsx';


function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Categoria" element={<CategoriaDeIngredientes />} />
            <Route path="/Ingredientes" element={<Ingredientes />} />
            <Route path="/Preparos" element={<Preparos />} />
            <Route path="/Opcoes" element={<Opcoes/>}></Route>
            <Route path="/Cardapios" element={<Cardapios/>}></Route>
            <Route path="/Valores" element={<TamanhosValores/>}></Route>
          </Routes> 
        </div>
      </div>
    </Router>
  );
}

export default App;
