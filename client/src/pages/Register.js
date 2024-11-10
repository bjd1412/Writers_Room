import React from "react";  
import { Formik, Form, Field, ErrorMessage } from 'formik';  
import StoryContext from "../Components/StoryContext" 
import { useContext } from "react";  
import * as Yup from 'yup';  

function Register(){
    const {handleSubmitUser} = useContext(StoryContext)

    const initialValues = {
        username: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    });

    const onSubmit = (values, {setSubmitting}) => {
        const formData = new FormData();
        formData.append('username', values.username);
        formData.append('password', values.password);

        fetch("/users", {
            method: "POST",
            body: formData,
        })
        .then(res => {  
            console.log('response:', res);  
            if (res.ok) {  
             return res.json();  
            } else {  
             throw new Error(res.statusText);  
            }  
          })  
          .then(newUser => {  
            console.log('newWrite:', newUser);  
            handleSubmitUser(newUser);  
          })  
          .catch(error => {  
            console.error('Error:', error);  
          });  
         setSubmitting(false)
    };

    return (
        <div>
            <h1>Create Account</h1>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
            {({isSubmitting})=> (
                <Form className="CreateAccount">
                    <label className="Label">Username</label>
                    <Field type="text" name="username"/>
                    <ErrorMessage name="username" component="div"/>
                    <label className="Label">Password</label>
                    <Field type="text" name="password"/>
                    <ErrorMessage name="password" component="div"/>
                    <input type="submit" value="Create" disabled={isSubmitting}/>
                </Form>
            )}

            </Formik>
        </div>
    )
}

export default Register