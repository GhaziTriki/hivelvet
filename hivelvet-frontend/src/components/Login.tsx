 import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth-service";
import { Component } from "react";
 
interface RouterProps {
  history: string;
}



type Props = {};

type State = {
 email: string,
  password: string,
  loading: boolean,
  message: string
};

export default class Login extends  Component < Props, State> {
 
  constructor(props:Props ) {
   super(props);
     this.handleLogin = this.handleLogin.bind(this);

    this.state = {
     email: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      email: Yup.string().required("This field is required!")
                   .email("This is not a valid email."),
      password: Yup.string().required("This field is required!"),
    });
  }

  handleLogin(formValue: { email: string; password: string }) {
    const { email, password } = formValue;
    
    this.setState({
      message: "",
      loading: true
    }); 


     AuthService.login(email, password).then(
      (response) => {
         this.setState({
          message: "success login",
          loading: true
        }); 
     
      },
      error => {
       
          
        this.setState({
          loading: false,
          
          message: "invalid credentials"
        }); 
      }
    ); 
  }

  render() {
    const { loading, message } = this.state;

    const initialValues = {
     email: "",
      password: "",
    };

    return (

       
      <div className="col-md-12">
      <div className="card card-container">
        <h1>Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={this.validationSchema}
          onSubmit={this.handleLogin}
        >
 
                <Form>
                {message && (
              <div className="form-group">
                <div
                  className={
                     loading ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
                      <div>
                        <div className="form-group">
                          <label htmlFor="email"> Email </label>
                           <Field name="email" type="text" className="form-control" />
                           <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password"> Password</label>
                           <Field name="password" type="password" className="form-control" />
                          <ErrorMessage
                            name="password"
                             component="div"
                            className="alert alert-danger"
                          />
                        </div>
                        <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
                        </div>
                        </Form>
                        </Formik>
      </div>
      </div>
        );
    






       
  }
}