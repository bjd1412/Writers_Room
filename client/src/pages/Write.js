import React from "react";  
import { Formik, Form, Field, ErrorMessage } from 'formik';  
import StoryContext from "../Components/StoryContext";  
import { useContext } from "react";  
import * as Yup from 'yup';   
  
function Write() {  
  const { handleSubmit } = useContext(StoryContext);  
  
  const initialValues = {  
   title: '',  
   story: '',  
  };  
  
  const validationSchema = Yup.object().shape({  
   title: Yup.string().required('Title is required'),  
   story: Yup.string().required('Story is required'),  
  });  
  
  const onSubmit = (values, { setSubmitting }) => {  
   const formData = new FormData();  
   formData.append('title', values.title);  
   formData.append('story', values.story);  
  
   fetch("/stories", {  
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
    .then(newWrite => {  
      console.log('newWrite:', newWrite);  
      handleSubmit(newWrite);  
    })  
    .catch(error => {  
      console.error('Error:', error);  
    });  
   setSubmitting(false)  
  };  
  
  return (  
   <div className="SubmitForm">  
    <h1>Express Your Inner Voice</h1>  
    <Formik  
      initialValues={initialValues}  
      validationSchema={validationSchema}  
      onSubmit={onSubmit}  
    >  
      {({ isSubmitting }) => (  
       <Form className="NewWrite">  
        <label className="Label">Title</label>  
        <Field type="text" name="title" placeholder="Title..." />  
        <ErrorMessage name="title" component="div" />  
        <label className="Label">Story</label>  
        <Field type="text" name="story" />  
        <ErrorMessage name="story" component="div" />  
        <input type="submit" value="Submit" disabled={isSubmitting} />  
       </Form>  
      )}  
    </Formik>  
   </div>  
  )  
}  
  
export default Write;