import StyledFotoContainer from './style';
import PropTypes from 'prop-types';

const FotoContainer = ({ selectedFile, fotoCarregada, mensagens }) => {
  if (!fotoCarregada) return null;

  const fotoIndex = mensagens.findIndex((mensagem) => mensagem.from === 'user' && mensagem.text === 'Foto adicionada');

  if (fotoIndex === -1) return null;

  return (
    <StyledFotoContainer>
      <img src={URL.createObjectURL(selectedFile)} alt="Foto" />
    </StyledFotoContainer>
  );
};

FotoContainer.propTypes = {
  selectedFile: PropTypes.object.isRequired,
  fotoCarregada: PropTypes.bool.isRequired,
  mensagens: PropTypes.array.isRequired,
};

export default FotoContainer;