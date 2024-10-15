export function animateText() {
  let index = 0;

  function showText() {
    const texts = document.querySelectorAll('.rolling-text'); // Buscar os elementos dentro da função
    if (texts.length === 0) return; // Garantir que os elementos existam

    // Remover classes antigas
    texts.forEach((text, i) => {
      text.classList.remove('active', 'left', 'right');

      if (i === (index + 1) % texts.length) {
        text.classList.add('left'); // Sai da tela à esquerda
      } else if (i === index) {
        text.classList.add('active'); // Classe ativa para o texto atual
      } else if (i === (index + texts.length - 1) % texts.length) {
        text.classList.add('right'); // Próxima para entrar à direita
      }
    });

    // Mover para o próximo texto
    index = (index + 1) % texts.length;
  }

  // Iniciar a animação com intervalo
  const interval = setInterval(showText, 4000); // Trocar a cada 4 segundos

  // Primeira chamada para garantir que o primeiro texto seja exibido
  showText();

  // Limpar o intervalo ao desmontar o componente
  return () => clearInterval(interval);
}
