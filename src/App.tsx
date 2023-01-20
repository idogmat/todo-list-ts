import React, { useEffect } from "react";
import TodoListContainer from "./components/TodoListContainer";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { useAppDispatch, useAppSelector } from "./store/store";
import { CircularProgress } from "@mui/material";
import { initializeApp } from "./store/actions/auth";

const App = () => {
  // const navigate = useNavigate()
  const dispatch = useAppDispatch();
  // const isLoggedIn = useAppSelector(state=>state.auth.isLoggedIn)
  const isInitialized = useAppSelector(
    (state) => state.appStatus.isInitialized
  );
  useEffect(() => {
    dispatch(initializeApp());
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
    <>
      <Routes>
        <Route path={"/"} element={<TodoListContainer />} />
        <Route path={"/login"} element={<Login />} />

        <Route
          path={"/404"}
          element={<h1 style={{ textAlign: "center" }}>404:PAGE NOT FOUND</h1>}
        />
        <Route path={"*"} element={<Navigate to={"/404"} />} />
      </Routes>
    </>
  );
};

export default App;
