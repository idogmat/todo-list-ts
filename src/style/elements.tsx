import React from "react";
import styled, { keyframes } from "styled-components";
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const HeaderTitle = styled.h2`
  color: #ec6262;
  background: -webkit-linear-gradient(#ec6262, #251212);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  box-sizing: border-box;
`;

export const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.size || "2rem",
}))`
  border: 2px solid palevioletred;
  background: transparent;
  border-radius: 30px;
  width: 100%;
  height: ${(props) => props.size};
  margin: auto;
  outline: none;
  color: #db7093ff;
  font-size: 1.5rem;
  box-sizing: border-box;
`;

export const BtnStyle = styled.button.attrs((props: any) => ({
  size: props.size || "none",
}))`
  display: inline-block;
  color: palevioletred;
  cursor: pointer;
  height: ${(props) => props.size || "none"};
  margin: 1rem;
  box-sizing: border-box;
  border: 2px solid palevioletred;
  border-radius: 30px;
  font-weight: 700;

  :hover {
    background: palevioletred;
    color: #fff;
  }
  :disabled {
    opacity: 0.1;
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
  color: #ec6262;
  background: -webkit-linear-gradient(#ec6262, #251212);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  box-sizing: border-box;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  margin: auto;
  border-top: 2px solid palevioletred;
  border-right: 2px solid palevioletred;
  border-bottom: 2px solid palevioletred;
  border-left: 4px solid palevioletred;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  opacity: 1;
`;

const loading = keyframes`
  from {
    right: 100%
  }
  to {
    right: 0
  }
`;
//

export const Loader = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  box-shadow: 1px 1px 18px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  ::before {
    content: "";
    display: block;
    position: absolute;
    rigth: 0%;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(to left, #ec6262, #830505);
    animation: ${loading} 1s ease-in-out infinite;
  }
`;

export const Skeleton = () => {
  return <Loader width={"98%"} height={"18px"} />;
};

const fadein = keyframes`
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 1rem;
      opacity: 1;
    }
`;

export const Container = styled.div.attrs((props: any) => ({
  status: props.status,
}))`
  position: fixed;
  z-index: 1000;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  height: auto;
  padding: 0.625rem 1rem;
  border-radius: 0.75rem;
  border: transparent;
  color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadein} 0.5s;
  background-color: ${(status: any) =>
    status.status === "succeeded" ||
    status.status === "loading" ||
    status.status === "idle"
      ? "hsl(200, 100%, 65%)"
      : "hsl(0,100%,50%)"};
`;

export const ButtonSnackbar = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-left: 1rem;
  height: 1.75rem;
  width: 1.75rem;
  text-align: center;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.5);
  }
`;
export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 50px;
`;
