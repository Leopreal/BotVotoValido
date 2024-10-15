import { FaBars, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  ToggleButton,
  SidebarContainer,
  NavList,
  NavItem,
  NavLink,
} from './MenuStyle';

const MenuHamburguer = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <ToggleButton className={`hamburguer ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />} {/* Alterna entre ícones de abrir e fechar */}
      </ToggleButton>

      <SidebarContainer className={isOpen ? 'open' : ''}>
        <NavList>
          <NavItem><NavLink href="/">Início</NavLink></NavItem>
          <NavItem><NavLink href="/cadastro">Cadastro</NavLink></NavItem>
          <NavItem><NavLink href="*">Fórum</NavLink></NavItem>
          <NavItem><NavLink href="*">Sobre</NavLink></NavItem>
        </NavList>
      </SidebarContainer>
    </>
  );
};

MenuHamburguer.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Booleano para verificar se a sidebar está aberta
  toggleSidebar: PropTypes.func.isRequired, // Função para alternar a sidebar
};

export default MenuHamburguer;
