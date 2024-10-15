import { ChatBoxContent } from './style';
import { useEffect, useState } from 'react';
import uPloadImage from '../../assets/uploadImage.svg';
import useChatLogic from './chatLogic';
import Popup from '../Pop-up/index';
import App from '../Command/Comand';
import MensagensChat from './MensagemChat';

const ChatBox = () => {
  const {
    mensagens,
    mensagem,
    setMensagem,
    handleEnviarMensagem,
    showPopup,
    handleOpenPopup,
    handleClosePopup,
    handleConfirm,
    handleKeyDown,
    selectedFile,
    fotoCarregada,
    setStep,
    localizacao,
    categoria,
    subcategoria,
    handleRelatarProblema,
    handleConsultarProblema,
    handleButtonClick,
    handleSubcategoriaClick,
    setMensagens,
    handleEnviarManualmente,
    handleCompartilharLocalizacao
  } = useChatLogic();

  const [opcaoSelecionada] = useState(null);

  useEffect(() => {
    if (selectedFile && fotoCarregada) {
      setStep('enviarLocalizacao');
    }
  }, [selectedFile, fotoCarregada, setStep]);

  return (
    <ChatBoxContent>
      <main>
        <div className="chat-container">
          <div className="chat-body">
            {mensagens.filter(mensagem => mensagem.text !== '').map((mensagem, indice) => (
              <MensagensChat
                key={indice}
                mensagem={mensagem}
                indice={indice}
                selectedFile={selectedFile}
                fotoCarregada={fotoCarregada}
                mensagens={mensagens}
                handleRelatarProblema={handleRelatarProblema}
                handleConsultarProblema={handleConsultarProblema}
                handleButtonClick={handleButtonClick}
                setMensagens={setMensagens}
                handleCompartilharLocalizacao={handleCompartilharLocalizacao}
                 handleEnviarManualmente={handleEnviarManualmente}
                 handleSubcategoriaClick={handleSubcategoriaClick}
              />
            ))}
          </div>
          <div className="chat-footer">
            <button className="uploadFile" title="Anexar um arquivo" onClick={handleOpenPopup}>
              <img src={uPloadImage} alt="Anexar arquivo " />
            </button>
            <input
              type="text"
              value={mensagem}
              onChange={(evento) => setMensagem(evento.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
            />
            <button onClick={handleEnviarMensagem}>Enviar</button>
          </div>
        </div>
      </main>
      {showPopup && (
        <Popup onClose={handleClosePopup} onConfirm={handleConfirm} />
      )}
      {opcaoSelecionada && (
        <App
          opcaoSelecionada={opcaoSelecionada}
          localizacao={localizacao}
          categoria={categoria}
          subcategoria={subcategoria}
        />
      )}
    </ChatBoxContent>
  );
};

export default ChatBox;