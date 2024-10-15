export const digitacao = (elemento) => {
     const texto = elemento.textContent.split('');
     elemento.innerHTML = '';
     texto.forEach((letra, i) => {
       setTimeout(() => elemento.innerHTML += letra, 30 * i);
     });
   };
   