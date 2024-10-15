import axios from 'axios';



const enviarDados = async (dados) => {
  try {
    const response = await axios.post('/api/endpoint', dados, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Dados recebidos:', response.data);
  } catch (error) {
    console.error('Erro:', error);
  }
};

// enviarDados(dados);
export default enviarDados;