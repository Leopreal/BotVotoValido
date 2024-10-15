

const api = {
  criarDenuncia: async (dados) => {
    try {
      const response = await fetch('/denuncias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  lerDenuncias: async () => {
    try {
      const response = await fetch('/denuncias/chatbot/ler');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getLocalizacao: async (coordenadas) => {
    try {
      const response = await fetch('/localizacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ coordenadas })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default api;