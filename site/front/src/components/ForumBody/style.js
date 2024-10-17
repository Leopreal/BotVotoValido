import styled from "styled-components";

export const Card = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 100%; /* Ajusta a largura do card */
  max-width: 300px; /* Define uma largura máxima para o card */
`;

export const CardImage = styled.img`
  width: 100%; /* A imagem ocupa toda a largura do card */
  height: 150px; /* Altura fixa para as imagens */
  object-fit: cover; /* Cobre o espaço do card mantendo a proporção */
  border-radius: 5px; /* Bordas arredondadas */
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 10px 0; /* Adiciona espaço em volta do título */
`;

export const CardContent = styled.p`
  font-size: 16px;
  color: #555;
  margin: 10px 0; /* Adiciona espaço em volta do conteúdo */
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ExpandedContent = styled.p`
  font-size: 14px;
  color: #333;
  margin-top: 10px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Distribui os cards com espaço entre eles */
  gap: 15px;
`;
