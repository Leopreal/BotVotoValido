import styled from "styled-components";
import Theme from "../../styles/theme";

const { colors } = Theme;

const ChatBoxContent = styled.main`
  * {
    all: unset;
    box-sizing: border-box;
  }

  main {
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100%;
  }

  .chat-container {
    margin-top: 50px;
    width: 70%;
    max-width: 100%;
    background-color: #e0dddd;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 79vh;

    .chat-body {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .chat-message {
      display: inline-block; /* Ocupa apenas o espaço necessário */
      padding: 10px 15px;
      margin-bottom: 10px;
      border-radius: 10px;
      background-color: #fff;
      max-width: 80%; /* Define um limite de largura para quebrar o texto */
      word-wrap: break-word; /* Garante que o texto quebre para a linha de baixo */
      word-break: break-word;

      &.user {
        background-color: ${colors.blueLogo};
        color: #fff;
        margin-left: auto;
      }

      &:not(.user) {
        justify-content: flex-start;
      }
      .eftTyping {
        white-space: pre-wrap;

         a {
           color: #007bff;
           text-decoration: none;
      }  
    }
}
    .chat-footer {
      padding: 10px;
      display: flex;
      border-top: 1px solid #ffff;

      input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ffff;
        border-radius: 5px;
        font-size: 1rem;
      }

      button {
        background-color: ${colors.blueLogo};
        color: #fff;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 10px;
      }
        .uploadFile{
          background-color: ${colors.blueLogo};
      }
    }
    .button-group {
    display: flex;
    flex-direction: column;
     align-items: start;
  }
   
   ///Media Query///

   @media (max-width: 1000px) {
   .chat-container {
     min-width:80%; 

   .chat-footer{
    input {
        padding: 7px; /* Reduz pela metade */
        font-size: 0.9rem; /* Reduz a fonte pela metade */
      }

      button {
        padding: 4px 7.5px; /* Reduz pela metade */
        margin-left: 5px; /* Ajuste proporcional */
      }
     }
   }
 }

  @media (max-width: 820px) {
     .chat-container {
      min-width: 75%;

    .chat-body {
      padding: 10px; /* Reduz pela metade */
    }

    .chat-message {
      padding: 7px 10px; /* Reduz pela metade */
      margin-bottom: 25px; /* Reduz pela metade */
    }

    .chat-footer {
      padding: 10px; /* Reduz pela metade */

      input {
        padding: 7px; /* Reduz pela metade */
        font-size: 0.9rem; /* Reduz a fonte pela metade */
      }

      button {
        padding: 2px 7.5px; /* Reduz pela metade */
        margin-left: 5px; /* Ajuste proporcional */
      }
    }
  }
}

  @media (max-width: 690px) {
     .chat-container {
      

    .chat-body {
      padding: 10px; /* Reduz pela metade */
    }

    .chat-message {
      padding: 5px 10px; /* Reduz pela metade */
      margin-bottom: 25px; /* Reduz pela metade */
    }

    .chat-footer {
      padding: 5px; /* Reduz pela metade */

      input {
        padding: 5px; /* Reduz pela metade */
        font-size: 0.8rem; /* Reduz a fonte pela metade */
      }

      button {
        font-size:12px;
        padding: 2px 7.5px ; /* Reduz pela metade */
        margin-left: 5px; /* Ajuste proporcional */
      }
        .uploadFile{
          font-size:10px;
        }
    }
  }
}

     @media (max-width: 595px) {
       .chat-container {
        min-width: 90%;

    .chat-body {
      padding: 10px; /* Reduz pela metade */
    }

    .chat-message {
      padding: 5px 10px; /* Reduz pela metade */
      margin-bottom: 25px; /* Reduz pela metade */
      font-size: 14px;
    }

    .chat-footer {
      padding: 5px; /* Reduz pela metade */

      input {
        padding: 5px; /* Reduz pela metade */
        font-size: 0.7rem; /* Reduz a fonte pela metade */
      }

      button {
        font-size:12px;
        padding: 2px 7.5px; /* Reduz pela metade */
        margin-left: 5px; /* Ajuste proporcional */
      }
        .uploadFile{
          font-size:10px;
        }
    }
  }
 }
   
    @media (max-width: 440px) {
       .chat-container {
         min-width: 90%;

    .chat-body {
      padding: 10px; /* Reduz pela metade */
    }

    .chat-message {
      padding: 5px 10px; /* Reduz pela metade */
      margin-bottom: 25px; /* Reduz pela metade */
      font-size: 12px;
    }

    .chat-footer {
      padding: 5px; /* Reduz pela metade */

      input {
        padding: 5px; /* Reduz pela metade */
        font-size: 0.7rem; /* Reduz a fonte pela metade */
      }

      button {
        font-size:12px;
        padding: 2px 7.5px; /* Reduz pela metade */
        margin-left: 5px; /* Ajuste proporcional */
      }
        .uploadFile{
          img{
            width:20px;
          }
        }
    }
  }
 }
`;

const CustomButton = styled.button`
    

  border: 1px solid ${colors.blueLogo};
  color: ${colors.blueLogo};
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px 10px 5px 0px;
  cursor: pointer;
`;

export { ChatBoxContent, CustomButton };