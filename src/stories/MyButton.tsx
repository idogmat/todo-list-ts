import React from "react";
import { BtnStyle } from "../style/elements";

type BtnType = {
  title: string;
};
export const MyButton = (props: BtnType) => {
  return <BtnStyle>{props.title}</BtnStyle>;
};
