// index.js
import { useState, useEffect } from 'react';

function App() {
  const [mensagem, setMensagem] = useState('');
  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [foto, setFoto] = useState(null);
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [denuncias, setDenuncias] = useState([]);

  useEffect(() => {
    const iniciar = async () => {
      const resposta = await fetch('/start');
      const dados = await resposta.json();
      setMensagem(dados.mensagem);
    };
    iniciar();
  }, []);

  const handleStart = async () => {
    const resposta = await fetch('/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mensagem: '1' })
    });
    const dados = await resposta.json();
    setMensagem(dados.mensagem);
  };

  const handleRelatarProblema = async () => {
    const resposta = await fetch('/relatar-problema', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ categoria, subcategoria, localizacao, foto })
    });
    const dados = await resposta.json();
    setMensagem(dados.mensagem);
  };

  const handleConsultarAtualizacoes = async () => {
    const resposta = await fetch('/consultar-atualizacoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ estado, cidade })
    });
    const dados = await resposta.json();
    setDenuncias(dados.denuncias);
  };

  const handleEnviarFoto = async (event) => {
    setFoto(event.target.files[0]);
  };

  const handleSelecionarCategoria = async (event) => {
    setCategoria(event.target.value);
  };

  const handleSelecionarSubcategoria = async (event) => {
    setSubcategoria(event.target.value);
  };

  const handleSelecionarLocalizacao = async (event) => {
    setLocalizacao(event.target.value);
  };

  const handleSelecionarEstado = async (event) => {
    setEstado(event.target.value);
  };

  const handleSelecionarCidade = async (event) => {
    setCidade(event.target.value);
  };

  return (
    <div>
      <h1>{mensagem}</h1>
      <button onClick={handleStart}>Iniciar</button>
      <button onClick={handleRelatarProblema}>Relatar Problema</button>
      <button onClick={handleConsultarAtualizacoes}>Consultar Atualizações</button>
      <input type="file" onChange={handleEnviarFoto} />
      <select onChange={handleSelecionarCategoria}>
        <option value="">Selecione uma categoria</option>
        <option value="categoria1">Categoria 1</option>
        <option value="categoria2">Categoria 2</option>
      </select>
      <select onChange={handleSelecionarSubcategoria}>
        <option value="">Selecione uma subcategoria</option>
        <option value="subcategoria1">Subcategoria 1</option>
        <option value="subcategoria2">Subcategoria 2</option>
      </select>
      <input type="text" onChange={handleSelecionarLocalizacao} />
      <select onChange={handleSelecionarEstado}>
        <option value="">Selecione um estado</option>
        <option value="estado1">Estado 1</option>
        <option value="estado2">Estado 2</option>
      </select>
      <select onChange={handleSelecionarCidade}>
        <option value="">Selecione uma cidade</option>
        <option value="cidade1">Cidade 1</option>
        <option value="cidade2">Cidade 2</option>
      </select>
      <ul>
        {denuncias.map((denuncia) => (
          <li key={denuncia.id}>{denuncia.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;