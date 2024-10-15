const fileSelector = () => {
     const fileInput = document.createElement('input');
     fileInput.type = 'file';
     fileInput.accept = 'image/*';
     fileInput.click();
   
     return new Promise((resolve) => {
       fileInput.onchange = () => {
         const selectedFile = fileInput.files[0];
         resolve(selectedFile);
       };
     });
   };
   
   export default fileSelector;