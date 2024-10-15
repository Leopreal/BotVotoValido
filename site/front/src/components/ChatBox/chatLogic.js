import { useState, useEffect } from 'react';
import { digitacao } from './typingEffect';
// import { MensagensChat } from './MensagemChat';
import { carregar_problemas } from '../../../../../funcoes/problemas';
// import  enviarDados  from '../../../../../Api/testFetch.js';


const useChatLogic = () => {
  const [mensagens, setMensagens] = useState([
    { from: 'bot', text: 'Olá! Sou o Veve, o bot que vai ajudar a cidade.\n\n Diga onde está o problema, envie uma foto e descreva o que está acontecendo.\nVocê também pode fazer uma consulta rápida de denúncias já cadastradas.\nDigite <a>/start</a> para começar a usar o bot.' },
  ]);
  const [mensagem, setMensagem] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [step, setStep] = useState('inicio');
  const [localizacao, setLocalizacao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [fotoCarregada, setFotoCarregada] = useState(false);
  // const [file] = useState('');
// const [opcao] = useState('');
const [subcategoriaSelecionada,setSubcategoriaSelecionada] = useState('');
const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
const [phtoSelecionada, setphtoSelecionada] = useState('');

  const problemas = carregar_problemas();
  const topicos = Object.keys(problemas);
  const dicProblemas = problemas;

  const handleEnviarMensagem = () => {
    if (mensagem !== '') {
      if (step === 'enviarLocalizacao' && mensagem === '1') {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
  
            fetch(`https://eu1.locationiq.com/v1/reverse.php?key=pk.ddacdac981d0c27a478e935f8558a272&lat=${latitude}&lon=${longitude}&format=json`)
              .then(response => response.json())
              .then(data => {
                console.log(data);
                const localizacao = `${data.address.state}, ${data.address.city}, ${data.address.road}`;
                setLocalizacao(localizacao);
                setMensagens(prevMensagens => [...prevMensagens, { from: 'user', text: localizacao }]);
               
                setStep('categoria');
              })
              .catch(error => console.error(error));
          },
          (error) => console.error(error),
          {
            enableHighAccuracy: true, // Opção para alta precisão
            timeout: 10000,           // Tempo limite para obter a localização (10 segundos)
            maximumAge: 0             // Não usar cache, obter localização nova
          }
        );
        setMensagem('');
      } else if (step === 'enviarLocalizacao' && mensagem === '2') {
        setMensagens(prevMensagens => [
          ...prevMensagens,
          { from: 'user', text: mensagem },
          { from: 'bot', text: 'Por favor, digite a localização manualmente (Estado, Cidade, Nome da Rua):' }
        ]);
        setStep('localizacaoManual');
        setMensagem('');
      } else {
        const novaMensagem = mensagem;
        const resposta = getResposta(novaMensagem, step);
        setMensagens(prevMensagens => [...prevMensagens, { from: 'user', text: novaMensagem }]);
        setTimeout(() => {
          setMensagens(prevMensagens => [...prevMensagens, { from: 'bot', text: resposta }]);
        }, 300);
        setMensagem('');
        if (step === 'enviarLocalizacao' && mensagem) {
          setStep('finalizado');
          handleFinalizado();
        }
      }
     
    }
  };



  const getResposta = (mensagem, step) => {
    switch (step) {
      case 'inicio':
        if (mensagem === '/start') {
          setStep('opcoes');
          return 'Muito bem, com qual das opções você deseja seguir:';
        } else {
          return 'Digite /start para começar';
        }
      case 'opcoes':
        if (mensagem === 'Relatar um novo problema') {
          setStep('enviarFoto');
          return 'Muito bem! Vou te auxiliar até completar o cadastro. Envie uma foto do problema que você encontrou\nLembre-se, apenas UMA FOTO';
        } else if (mensagem === 'Consultar atualizações da minha cidade') {
          setStep('consultar');
          return 'Aqui estão as atualizações mais recentes:';
        } else {
          return 'Por favor, digite (Relatar um novo problema) ou (Consultar atualizações da minha cidade).';
        }
      case 'enviar Foto':
        if (selectedFile) {
          setStep('enviarLocalizacao ');
          return 'Agora compartilhe sua localização .';
        } else {
          return 'Por favor, envie uma foto do problema que você encontrou.';
        }
        
      case 'enviarLocalizacao':
        if (mensagem === 'Compartilhar a Localização Atual') {
          handleCompartilharLocalizacao();
          // setTimeout(() => {
          //   categoriasProblema();
          // }, 1000);
          setStep('categoria');
          return '';
        } else if (mensagem === 'Enviar Manualmente') {
          handleEnviarManualmente()
          return '';
        } else {
          if (mensagem.split(',').length === 3) {
            setLocalizacao(mensagem);
            setMensagens(prevMensagens => [...prevMensagens, { from: 'user', text: mensagem }]);
            setStep('categoria');
            categoriasProblema();
            return '';
          } else {
            return 'Por favor, digite exatamente como no Modelo (Estado, Cidade, Nome da Rua):';
          }
        }
        



        case 'categoria':
          if (mensagem) {
            const categoriaSelecionada = mensagem.trim().toLowerCase();
            const categoriasDisponiveis = Object.keys(dicProblemas).map(categoria => categoria.toLowerCase());
            const indexCategoria = categoriasDisponiveis.indexOf(categoriaSelecionada);
            if (indexCategoria !== -1) {
              const categoriaReal = Object.keys(dicProblemas)[indexCategoria];
              const subcategorias = dicProblemas[categoriaReal];
              if (subcategorias && subcategorias.length > 0) {
                setCategoria(categoriaReal);
                setStep('subcategoria');
                setTimeout(() => {
                  setMensagens(prevMensagens => [
                    ...prevMensagens,
                    // { from: 'bot', text: `Aqui estão as subcategorias para ${opcao}:\n ${subcategorias}` },
                    { from: 'bot',  text: 'Selecione qual o problema no local:\n' , opcoes: subcategorias, isSubcategory: true } ,
                    
                ])
                 }, 500);
                return ''
              } else {
                return 'Não há subcategorias disponíveis para a categoria selecionada.';
              }
            } else {
              for (const categoria in dicProblemas) {
                if (dicProblemas[categoria].includes(categoriaSelecionada)) {
                  setCategoria(categoria);
                  setSubcategoria(categoriaSelecionada);
                  setStep('finalizado');
                  handleFinalizado();
                  return `Obrigado por relatar o problema! Categoria: ${categoria}, Subcategoria: ${categoriaSelecionada}.`
                  
                  ;
                }
              }
            }
          } else {
            return 'Por favor, selecione uma categoria.';
          }

          break
          
        
          case 'subcategoria':
            if (mensagem) {
              const subcategoriaSelecionada = mensagem; // Removendo a conversão para número
              
          
              if (dicProblemas[categoria].includes(subcategoriaSelecionada)) {
                setSubcategoria(subcategoriaSelecionada);
                setStep('finalizado');
                return `Obrigado por relatar o problema! Categoriaa: ${categoria}, Subcategoria: ${subcategoriaSelecionada}.`;
              } else {
                return 'Subcategoria inválida. Por favor, selecione uma subcategoria válida.';
              }
            } else {
              return 'Por favor, selecione uma subcategoria.';
            }
        
            case 'finalizado':
            handleFinalizado();
            return 'Obrigado por relatar o problema!';
              





      case 'consultar':
        return 'Aqui estão as atualizações mais recentes:';
        case 'localizacaoManual':
      if (mensagem.split(',').length === 3) {
        setLocalizacao(mensagem);
        setTimeout(() => {
          categoriasProblema();
        }, 500);
        setStep('categoria');
        return '';
      } else {
        return 'Por favor, digite exatamente como no Modelo (Estado, Cidade, Nome da Rua):';
      }
          default:
            return 'Desculpe, não entendi sua mensagem.';
        }
      };




      
      const handleButtonClick = (opcao) => {
        const textoBotao = opcao;
        setMensagens(prevMensagens => [...prevMensagens, { from: 'user', text: textoBotao }]);
        console.log('eu acho que peguei alguma coisa', opcao)
        setCategoriaSelecionada(opcao);
        setTimeout(() => {
            // Aqui você verifica se a opção corresponde a uma chave em problemas
            if (problemas[opcao]) {
              
                const subcategorias = problemas[opcao];
               
                // Adiciona a mensagem com as subcategorias
                setMensagens(prevMensagens => [
                    ...prevMensagens,
                    // { from: 'bot', text: `Aqui estão as subcategorias para ${opcao}:\n ${subcategorias}` },
                    { from: 'bot', text: 'Selecione qual o problema no local:\n', opcoes: subcategorias, isSubcategory: true },
                ]);


            } else {
                // Caso não corresponda a uma chave, continue como antes
                switch (opcao) {
                    case '1':
                        setStep('enviarFoto');
                        setMensagens(prevMensagens => [...prevMensagens, { from: 'bot', text: 'Muito bem! Vou te auxiliar até completar o cadastro. Envie uma foto do problema que você encontrou\nLembre-se, apenas UMA FOTO' }]);
                        break;
                    case '2':
                        setStep('consultar');
                        setMensagens(prevMensagens => [...prevMensagens, { from: 'bot', text: 'Aqui estão as atualizações mais recentes:' }]);
                        break;
                    case '3':
                        setStep('Enviar Manualmente');
                        setMensagens(prevMensagens => [...prevMensagens, { from: 'bot', text: 'Aqui estão as atualizações mais recentes:' }]);
                        break;
                    default:
                        break;
                }
            }
        }, 500);
    };



  const handleRelatarProblema = () => {
    setMensagens(prevMensagens => [...prevMensagens, { from: 'user', text: 'Relatar um novo problema' }]);
    setTimeout(() => {
      setStep('enviarFoto');
      setMensagens(prevMensagens => [...prevMensagens, { from: 'bot', text: ' Muito bem! Vou te auxiliar até completar o cadastro.\n Envie uma foto do problema que você encontrou \nLembre-se, apenas UMA FOTO' }]);
    }, 500 );
  };
  
  const handleConsultarProblema = () => {
    setMensagens (prevMensagens => [...prevMensagens, { from: 'user', text : 'Consultar atualizações da minha cidade' }]);
    setTimeout (() => {
 setStep('consultar ');
      setMensagens(prevMensagens => [...prevMensagens, { from: 'bot', text: 'Aqui estão as atual izações mais recentes:' }]);
    }, 500);
  };



  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };



 

  const handleConfirm = (file) => {
    setSelectedFile(file);
    setFotoCarregada(true);
    handleClosePopup();
   
    setphtoSelecionada(file)
    if (step === 'enviarFoto') {
      console.log('Foto selecionadaa iai:', file);
      const phtoSelecionada = file
      setphtoSelecionada(phtoSelecionada)
      setMensagens(prevMensagens => [...prevMensagens, 
        { from: 'user', text: 'Foto adicionada' }, 
        { from: 'bot', text: 'Agora compartilhe sua localização:' },
      ]);
    } else {
      setMensagens(prevMensagens => [...prevMensagens, { from: 'user', text: 'Foto adicionada' }, { from: 'bot', text: 'Ótimo!' }]);
    }
  };

  const handleKeyDown = (evento) => {
    if (evento.key === 'Enter') {
      handleEnviarMensagem ();
    }
  };

  const categoriasProblema = () =>{
  setTimeout(() => {
    const opcoes = topicos;
    
    setMensagens(prevMensagens => [...prevMensagens, { from: 'bot', text: 'Selecione a categoria do problema:', opcoes: opcoes, isSubcategory: false }]);
    }, 300);
  }
  
  const handleSubcategoriaClick = (subcategoria) => {
    
    setMensagens(prevMensagens => [...prevMensagens, { from: 'user', text: subcategoria }]);
    setMensagens(prevMensagens => [
      ...prevMensagens,
      {
        from: 'bot',
        text: `Obrigado por relatar o problema de ${subcategoria}. Sua contribuição mantém a ordem na cidade.`,
      },
    ]);
    console.log('Peguei a ', subcategoria)
    // setStep('finalizado');
    setSubcategoriaSelecionada(subcategoria);
  };


  const getSubcategorias = (opcao) => {
    if (problemas[opcao]) {
      return problemas[opcao];
    }
    return [];
  };
  

  
  const handleFinalizado = (dados) => {
    console.log(dados);
    // agora você pode usar o objeto dados aqui
  };
  
  const dados = {
    foto:phtoSelecionada,
    localizacao: localizacao,
    categoria: categoriaSelecionada,
    subcategoria: subcategoriaSelecionada
  };
  
  handleFinalizado(dados);

  
  const handleCompartilharLocalizacao = () => {
    // setMensagens(prevMensagens => [...prevMensagens, { from: 'user', text: 'Compartilhar a Localização Atual' }]);
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetch(`https://eu1.locationiq.com/v1/reverse.php?key=pk.ddacdac981d0c27a478e935f8558a272&lat=${latitude}&lon=${longitude}&format=json`)
            .then(response => response.json())
            .then(data => {
              const localizacao = `${data.address.state}, ${data.address.city}, ${data.address.road}`;
              console.log('Dados coletado:', localizacao); 
              setLocalizacao(localizacao);
              setMensagens(prevMensagens => [...prevMensagens, { from: 'user', text: localizacao }]);
              
              setStep('categoria');
            })
            .catch(error => console.error(error));
        }, 
        (error) => console.error(error),
        {
          enableHighAccuracy: true, // Habilita a alta precisão
          timeout: 5000,            // Tempo limite de 5 segundos
          maximumAge: 0             // Não usar cache
        }
      );
    }, 500);
       
    setTimeout(() => {
      categoriasProblema()
    },1500)
    
  };
  
  const handleEnviarManualmenteClick = () => {
    handleEnviarManualmente();
  };

  const handleEnviarManualmente = () => {
    setTimeout(() => {
      setMensagens(prevMensagens => [...prevMensagens, { from: 'bot', text: 'Por favor, digite a localização manualmente (Estado , Cidade, Nome da Rua):' }]);
      setStep('localizacaoManual');
    }, 500);
  };

  useEffect (() => {
    const lastTypingRef = document.querySelector('.last-bot-message');
    if (lastTypingRef) {
      digitacao(lastTypingRef);
    }
  }, [mensagens]);

  return {
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
    getSubcategorias,
    categoria,
    subcategoria,
    handleButtonClick,
    handleRelatarProblema,
    handleConsultarProblema,
    handleCompartilharLocalizacao,
    handleEnviarManualmenteClick,
    categoriaSelecionada,
    setMensagens,
    phtoSelecionada,
    handleEnviarManualmente, 
    handleSubcategoriaClick ,
    handleFinalizado
  };
};

export default useChatLogic;