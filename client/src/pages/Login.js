import React from "react";  
import { Formik, Form, Field, ErrorMessage } from 'formik';  
import StoryContext from "../Components/StoryContext";  
import { useContext } from "react";  
import * as Yup from 'yup';  
  
function Login() {  
  const { handleSubmit } = useContext(StoryContext);  
  
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
      console.log('user:', user);  
      handleSubmit(user);  
     })  
     .catch(error => {  
      console.error('Error:', error);  
      if (error.message === 'INTERNAL SERVER ERROR') {  
        // Handle 500 error response  
      }  
     });  
    setSubmitting(false)  
  };  
  
  return (  
   <div className="SubmitForm">  
    <h1>Login</h1>  
    <Formik  
      initialValues={initialValues}  
      validationSchema={validationSchema}  
      onSubmit={onSubmit}  
    >  
      {({ isSubmitting }) => (  
       <Form className="NewWrite">  
        <label className="Label">Username</label>  
        <Field type="text" name="username" placeholder="Username" />  
        <ErrorMessage name="username" component="div" />  
        <label className="Label">Password</label>  
        <Field type="password" name="password" placeholder="Password" />  
        <ErrorMessage name="password" component="div" />  
        <input type="submit" value="Login" disabled={isSubmitting} />  
       </Form>  
      )}  
    </Formik>  
   </div>  
  )  
}  
  
export default Login;