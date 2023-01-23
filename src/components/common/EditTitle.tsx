import React, { useState } from "react";
import { Input, TodoTitle } from "../../style/elements";
import { RequestStatusType } from "../../store/app-reducer";

type EditableTitleType = {
  title: string;
  callBack: (a: string) => void;
  entityStatus: RequestStatusType;
};
const EditableTitle: React.FC<EditableTitleType> = React.memo(
  ({ title, callBack, entityStatus }) => {
    let [editOption, setEditOption] = useState(false);
    let [titleState, setTitle] = useState(title);
    const activateEditMode = () => {
      if (entityStatus !== "loading") {
        setEditOption(true);
        setTitle(title);
      }
    };
    const activateViewMode = () => {
      if (entityStatus !== "loading") {
        setEditOption(false);
        callBack(titleState);
      }
    };
    const onChangeTitleHandler = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setTitle(e.currentTarget.value);
    };
    return editOption ? (
      <Input
        size={"2rem"}
        onBlur={activateViewMode}
        value={titleState}
        onChange={onChangeTitleHandler}
        autoFocus
      />
    ) : (
      <TodoTitle onDoubleClick={activateEditMode}>{title}</TodoTitle>
    );
  }
);
export default EditableTitle;
