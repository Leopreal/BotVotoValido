import HeaderAndNav from '../../components/header/HeaderAndNav'; // Importa o Header e o Nav
import ChatBox from '../../components/ChatBox/index'; // Importa o ChatBox
import { ContentServices } from './style'; // Importa o styled component

export default function CadastrarDenuncia() {
  return (
    <ContentServices> {/* Use o styled component aqui */}
      <HeaderAndNav /> {/* Adiciona o Header e Nav */}
      <ChatBox /> {/* Adiciona o ChatBox */}
    </ContentServices>
  );
}
