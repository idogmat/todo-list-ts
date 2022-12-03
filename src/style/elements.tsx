
import styled from "styled-components";
export const Input = styled.input.attrs(props => ({
    type: "text",
    size: props.size || "2rem",
}))`
  border: 2px solid palevioletred;
  background: transparent;
  border-radius: 30px;
  width: 100%;
  height: ${props => props.size};
  margin: auto;
  outline: none;
  color: #DB7093FF;
  font-size: 1.5rem;
  box-sizing: border-box;
`;

export const BtnStyle = styled.button.attrs((props:any) => ({
    size: props.size || "none",
}))`
  display: inline-block;
  color: palevioletred;
  cursor: pointer;
  height: ${props=>props.size};
  margin: 1rem;
  box-sizing: border-box;
  border: 2px solid palevioletred;
  border-radius: 30px;
  :hover{
    background: palevioletred;
    color: #fff;
  }

`;
export const HiddenCheckbox = styled.input`
  box-sizing: border-box;
  border: 0;
  -webkit-clip: rect(0 0 0 0);
  clip: rect(0 0 0 0);
  -webkit-clippath: inset(50%);
  clippath: inset(50%);
  height: 1rem;
  width: 2rem;
  margin: auto 0;
  cursor: pointer;
  box-sizing: border-box;
`;
export const TodoTitle = styled.p`
  box-sizing: border-box;
  font-size: 20px;
  font-weight: 600;
  height: 2rem;
  margin: auto;
  color: linear-gradient(#ec6262,#251212);
  background: -webkit-linear-gradient(#ec6262,#251212);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  box-sizing: border-box;


`