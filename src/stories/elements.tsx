
import styled from "styled-components";
export const Input = styled.input.attrs(props => ({
    type: "text",
    size: props.size || "1rem",
}))`
  border: 2px solid palevioletred;
  border-radius: 30px;
  width: 100%;
  height: 3rem;
  margin: ${props => props.size};
  color: #DB7093FF ;
  font-size: 20px;
`;

export const BtnStyle = styled.button`
  display: inline-block;
  color: palevioletred;
  cursor: pointer;
  font-size: 1rem;
  margin: 1rem;
  padding:0 1rem;
  border: 2px solid palevioletred;
  border-radius: 30px;
  :hover{
    background: palevioletred;
    color: #fff;
  }

`;
export const HiddenCheckbox = styled.input`
  border: 0;
  -webkit-clip: rect(0 0 0 0);
  clip: rect(0 0 0 0);
  -webkit-clippath: inset(50%);
  clippath: inset(50%);
  height: 2rem;
  width: 2rem;
  margin: auto 0;
  cursor: pointer;
`;
export const TodoTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: auto;
  color: linear-gradient(#ec6262,#251212);
  background: -webkit-linear-gradient(#ec6262,#251212);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;


`