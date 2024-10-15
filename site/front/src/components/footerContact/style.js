import styled from 'styled-components';
import Theme from "../../styles/theme";


const { colors } = Theme;

const FooterContainer = styled.footer`
      * {
    all: unset;
    box-sizing: border-box;
  }

  background-color: ${colors.blueLogo};
  color: white;
  padding: 20px 0;
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    
    max-width: 1200px;
    margin: 0px auto 0px 100px;
    padding: 0 20px;

    .footer-section {
      flex: 1;
      margin: 0 10px;
      
      display:flex;
      flex-direction: column;

      h3 {
        margin-bottom: 10px;
        font-weight: bold;
      }

      ul {
        display:flex;
        flex-direction: column;
        list-style: none;
        padding: 0;

        li {
          margin: 5px 0;

          a {
            color: white;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
              color: #f0c14b;
            }
          }
        }
      }
    }
  }

  .footer-bottom {
    display:flex;
    justify-content:center;
    align-itens:center;
    margin-top: 25px;
    font-size: 14px;

  }

  @media (max-width: 949px) {
  
   }
`;
export {FooterContainer};