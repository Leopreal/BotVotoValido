import styled from 'styled-components';
import fundoChat from '../../assets/wireframe-city-blue.png';

export const ContentServices = styled.div`
  height: 100vh; /* Define a altura do componente */
   overflow-y: auto;
  
  background-image: url(${fundoChat}); /* Usa a imagem importada */
  background-size: cover; /* Cobre todo o espaço disponível */
  background-position: center; /* Centraliza a imagem */
`;
