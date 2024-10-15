import styled from "styled-components";
// import Theme from "../../styles/theme";

// const { colors } = Theme;

const PopupContainer = styled.div`
  z-index:9999999999999999999999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 300px;

  .popup-icon {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    .circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #ffff00;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
    }
  }

  .popup-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .cancel-button {
      background-color: #cccccc;
      color: #fff;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        background-color: #aaa;
      }
    }

    .confirm-button {
      background-color: #032B44;
      color: #fff;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        background-color: #044A7C;
      }
    }
  }
`;

export { PopupContainer, PopupContent };