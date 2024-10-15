import { FooterContainer } from './style'; 
const FooterContact = () => {
  return (
    <FooterContainer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Sobre nós</h3>
          <ul>
            <li><a href="#">Quem somos</a></li>
            <li><a href="#">Trabalhe conosco</a></li>
            <li><a href="#">Política de privacidade</a></li>
            <li><a href="#">Termos de uso</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Ajuda</h3>
          <ul>
            <li><a href="#">Central de ajuda</a></li>
            <li><a href="#">Devoluções</a></li>
            <li><a href="#">Rastrear pedido</a></li>
            <li><a href="#">Fale conosco</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Conta</h3>
          <ul>
            <li><a href="#">Seu perfil</a></li>
            <li><a href="#">Seus pedidos</a></li>
            <li><a href="#">Lista de desejos</a></li>
            <li><a href="#">Cartões-presente</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Social</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Voto Válido. Todos os direitos reservados.</p>
      </div>
    </FooterContainer>
  );
};

export default FooterContact;
