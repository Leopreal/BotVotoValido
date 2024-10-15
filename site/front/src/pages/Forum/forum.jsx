import HeaderAndNav from '../../components/header/HeaderAndNav';// Importa o Header e o Nav
import FooterContact from '../../components/footerContact/footerContact';// Importa o footer
import CommentSection from '../../components/CommentSection/CommentSection';// Importa o Header e o Nav
import { ContentForum } from './style'; // Importa o styled component

export default function Forum() {
  return (
    <ContentForum> {/* Use o styled component aqui */}
      <HeaderAndNav /> {/* Adiciona o Header e Nav */}
       <CommentSection/>
      <FooterContact />
    </ContentForum>
  );
}
