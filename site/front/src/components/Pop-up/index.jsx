import { PopupContainer, PopupContent } from './style';
import PropTypes from 'prop-types';
import fileSelector from './fileSelector';

const Popup = ({ onClose, onConfirm }) => {
  return (
    <PopupContainer>
      <PopupContent>
        <div className="popup-icon">
          <div className="circle">
            <span>!</span>
          </div>
        </div>
        <p>Atenção! Sua denúncia é anônima. Fotos enviadas não podem ser apagadas.</p>
        <div className="popup-buttons">
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="confirm-button" onClick={async () => {
            const selectedFile = await fileSelector();
            onConfirm(selectedFile);
          }}>
            Confirmar
          </button>
        </div>
      </PopupContent>
    </PopupContainer>
  );
};

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Popup;