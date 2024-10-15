import { useEffect, useState } from 'react';  
import { HeaderContent, Nav } from './style';
import logoCompleto from '../../assets/voto_completo.png';
import logo from '../../assets/voto1.png';
import { animateText } from './rolling'; 
import MenuHamburguer from '../MenuHamburguer/Menu'; 

const HeaderAndNav = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar a visibilidade do menu

  useEffect(() => {
    animateText(); // Chama a função de animação
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Alterna o estado da sidebar
  };

  return (
    <>
      <HeaderContent>
        <div className="text-container" id="text-container">
          <div className="rolling-text" id="rolling-text-1">
            <img src={logoCompleto} alt="" />
          </div>
          <div className="rolling-text" id="rolling-text-2">
            <p>Registre Sua Denuncia</p>
          </div>
          <div className="rolling-text" id="rolling-text-3">
            <p>Total Privacidade</p>
          </div>
        </div>
      </HeaderContent>

      <Nav className="nav">
        <div className='logoVotoValido'>
          <img src={logo} alt="" />
        </div>
        <button className="hamburguer" onClick={toggleSidebar}>
          {/* Aqui você pode incluir ícones de hamburguer ou texto, se desejar */}
        </button>
        <ul className="nav-list">
          <li><a href="/" className="nav-link">Inicio</a></li>
          <li><a href="/cadastro" className="nav-link">Cadastro</a></li>
          <li><a href="/forum" className="nav-link">Forum</a></li>
          <li><a href="*" className="nav-link">Sobre</a></li>
        </ul>
        <div className="box-nav-contact">
          <a href="" className="nav-contact">Contato</a>
        </div>
      </Nav>

      {/* Menu (Sidebar) Component */}
      <MenuHamburguer isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default HeaderAndNav;
