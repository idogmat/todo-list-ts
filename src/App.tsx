import React, { useEffect } from "react";
import TodoListContainer from "./components/TodoListContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { authMeThunk } from "./store/thunks/authThunks";
import { CircularProgress } from "@mui/material";
import { getIsInitialized } from "./store/selectors";
import { useAppDispatch, useAppSelector } from "./store/type";
import { MainWrapper } from "./style/elements";

const App = () => {
  const isInitialized = useAppSelector(getIsInitialized);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authMeThunk());
  }, []);
  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress style={{ color: "#DB7093FF" }} />
      </div>
    );
  }
  return (
    <MainWrapper>
      <Routes>
        <Route path={"/"} element={<TodoListContainer />} />
        <Route path={"/login"} element={<Login />} />

        <Route
          path={"/404"}
          element={<h1 style={{ textAlign: "center" }}>404:PAGE NOT FOUND</h1>}
        />
        <Route path={"*"} element={<Navigate to={"/404"} />} />
      </Routes>
    </MainWrapper>
  );
};

export default App;
