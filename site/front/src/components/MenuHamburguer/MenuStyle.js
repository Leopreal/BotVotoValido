import styled from 'styled-components';
import Theme from "../../styles/theme";

const { colors } = Theme;

export const ToggleButton = styled.button`
  position: absolute; /* Posiciona o botão em relação ao contêiner pai */
  right: 20px; /* Alinha o botão à direita */
  transform: translateY(-85%); /* Centraliza verticalmente */
  padding: 20px 0px;
  background-color: transparent;
  color: ${colors.blueLogo};
  border: none;
  cursor: pointer;
  font-size: 22px;
  
  &:hover {
    opacity: 0.8;
  }
    &.open {
    transform: translateY(-110%);
    margin-bottom: 10px;
    
    color: #ffff; /* Cor do "X" */
    z-index: 999;
  }

  /* Esconde o botão em telas maiores que 950px */
  @media (min-width: 950px) {
    display: none; /* O botão não será exibido */
  }

   @media only screen and (max-width: 480px) {
   transform: translateY(-95%);
   font-size: 20px;
   }


  @media only screen and (max-width: 375px) {
    transform: translateY(-95%);
    font-size: 16px;
    right: 15px
  }
`;

export const SidebarContainer = styled.div`
  position: fixed;
  right: -250px; /* Escondido inicialmente */
  top: 0;
  width: 250px;
  height: 100%;
  background-color: ${colors.blueLogo};
  transition: right 0.3s ease;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);

  &.open {
    right: 0; /* Menu visível */
  }
`;

export const NavList = styled.ul`
  list-style-type: none;
  text-align:center;
  margin-top:80px;
  
  padding: 0;
`;

export const NavItem = styled.li`
  margin: 10px 0px 70px 0;

`;

export const NavLink = styled.a`
  color: #ffff; /* Cor dos links */
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
