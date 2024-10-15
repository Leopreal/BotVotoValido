import styled from 'styled-components';
import Theme from "../../styles/theme";

const { colors } = Theme;

const CommentSectionContainer = styled.div`
    * {
    all: unset;
    box-sizing: border-box;
  }

  margin: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;

  h2 {
    margin-bottom: 10px;
  }

  .comment-form {
    display: flex;
    flex-direction: column;

    textarea {
      resize: none;
      height: 100px;
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      align-self: flex-start;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      background-color: ${colors.blueLogo};
      color: #ffff;
      cursor: pointer;

      &:hover {
        background-color: #0056b3; 
      }
    }
  }

  .comments-list {
    margin-top: 20px;

    .comment {
      background-color: #e9ecef;
      padding: 10px;
      margin: 5px 0;
      border-radius: 4px;
    }
  }
`;

export { CommentSectionContainer };
