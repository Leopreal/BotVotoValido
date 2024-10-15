import styled from "styled-components";

const StyledFotoContainer  = styled.div`
  width: 100%;
  height: 300px;
  background-color: transparent;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  

  img {
    
    float: right;
    width: 300px;
    height: 100%;
    object-fit: contain;
     clip-path: inset(15px round 15px);
    display: inline-block;
    
  }
`;

export default StyledFotoContainer ;