
import styled from "styled-components";
export const Input = styled.input.attrs(props => ({
    type: "text",
    size: props.size || "1em",
}))`
  border: 2px solid palevioletred;
  border-radius: 30px;
  width: 100%;
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

export const BtnStyle = styled.button`
  display: inline-block;
  color: palevioletred;
  
  font-size: 1rem;
  margin: 1rem;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 30px;

`;