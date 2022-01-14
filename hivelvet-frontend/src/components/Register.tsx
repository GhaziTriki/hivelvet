import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
 import AuthService from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { Navigate } from 'react-router-dom'
import Password from "antd/lib/input/Password";
type Props = {};

type State = {
  
  email: string,
  username:string,
  role:string,
  status:string,
  password: string,
  password2:string,
  successful: boolean,
  message: string
};

export default class Register extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
   
    this.state = {
     
     username:"",
     role:"",
     status:"",
      email: "",
      password: "",
      password2: "",
      successful: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
   
      username:Yup.string()
                  .required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("This field is required!"),
        password2: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        ) .required("This field is required!")
         ,
    });
  }

  handleRegister(formValue: {  email: string; username: string ;  password: string ; password2: string }) {
    const { email,username,  password,password2 } = formValue;
     
 

    AuthService.register(
      username,
      email,
      password
    ).then(
      response => {
      
      
       this.setState({
           message: "User Registred with success",
          
          successful: true
        }); 
     
      },
      error => {
        const resMessage="";
    
        if(error.response.data.errors.includes("email")){
           this.setState({
 
           successful: false,
           message: "A user with this email already exists",
         }); 
        }
        if(error.response.data.errors.includes("username")){
          this.setState({
          
           successful: false,
           message: "A user with this username already exists",
         }); 
 
        }

    

       
      }
    ); 
  }

  render() {
    const { successful, message } = this.state;

    const initialValues = {
     
      email: "",
      username:"",
      role:"",
      status:"",
      password: "",
      password2: "",
    };

    return (
      <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={this.validationSchema}
          onSubmit={this.handleRegister}
        >
          <Form>
          {message && (
              <div className="form-group">
                <div
                  className={
                      successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
           
              <div>
                <div className="form-group">
                  <label htmlFor="username"> Username </label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email"> Email </label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password"> Password </label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password"> Confirm Your Password </label>
                  <Field
                    name="password2"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password2"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
           

          
          </Form>
        </Formik>
      </div>
    </div>
  );
  }
}
