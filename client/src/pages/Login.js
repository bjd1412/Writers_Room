
import React from "react";  
import { Formik, Form, Field, ErrorMessage } from 'formik';  
import StoryContext from "../Components/StoryContext";  
import { useContext } from "react";
import { useNavigate } from "react-router-dom";  
import * as Yup from 'yup';  
  
function Login() {  
  const { handleLogin } = useContext(StoryContext);
  const navigate = useNavigate()  
  
  const initialValues = {  
   username: '',  
   password: '',  
  };  
  
  const validationSchema = Yup.object().shape({  
   username: Yup.string().required('Username is required'),  
   password: Yup.string().required('Password is required'),  
  });  
  
  
const onSubmit = (values, { setSubmitting }) => {  
  const formData = new FormData();  
  formData.append('username', values.username);  
  formData.append('password', values.password);  
  
  fetch("/login", {  
   method: "POST",  
   body: formData,  
  })  
   .then(res => {  
    if (res.ok) {  
      return res.json();  
    } else {  
      throw new Error(res.statusText);  
    }  
   })  
   .then(user => {
    if (user){
      handleLogin(user);
      navigate(`/account/${user.username}`);
    }   
   })  
   .catch(error => {  
    console.error('Error:', error);  
    if (error.message === 'INTERNAL SERVER ERROR') {  
       
    }  
   });  
  setSubmitting(false)  
};
 
return (  
  <div className="login-container">  
   <h1 className="login-header">Login</h1>  
   <Formik  
    initialValues={initialValues}  
    validationSchema={validationSchema}  
    onSubmit={onSubmit}  
   >  
    {({ isSubmitting }) => (  
      <Form className="login-form">  
       <div className="form-group">  
        <label className="form-label">Username</label>  
        <Field type="text" name="username" placeholder="Username" className="form-input" />  
        <ErrorMessage name="username" component="div" className="form-error" />  
       </div>  
       <div className="form-group">  
        <label className="form-label">Password</label>  
        <Field type="password" name="password" placeholder="Password" className="form-input" />  
        <ErrorMessage name="password" component="div" className="form-error" />  
       </div>  
       <button type="submit" className="login-button1" disabled={isSubmitting}>  
        Login  
       </button>  
      </Form>  
    )}  
   </Formik>  
  </div>  
)
}  
  
export default Login;