import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import Snackbar from "../common/Snackbar";
import { loginThunk } from "../../store/authThunks";
import { getError, getIsLoggedIn, getStatus } from "../../store/selectors";
import { useAppDispatch, useAppSelector } from "../../store/type";

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};
export const Login = () => {
  const status = useAppSelector(getStatus);
  const error = useAppSelector(getError);
  const isLoggedIn = useAppSelector(getIsLoggedIn);

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(loginThunk({ user: values }));
    },
  });
  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }
  return (
    <Grid container justifyContent={"center"}>
      <Snackbar status={status} error={error} />
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <a
                href={"https://social-network.samuraijs.com/"}
                target={"_blank"}
              >
                To log in get registered here
              </a>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />

              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox />}
                {...formik.getFieldProps("rememberMe")}
                checked={formik.values.rememberMe}
              />
              <Button
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                style={{ backgroundColor: "#c04169" }}
              >
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
