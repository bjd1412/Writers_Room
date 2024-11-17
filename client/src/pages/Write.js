

import React, { useState, useEffect } from 'react';  
import { Formik, Form, Field, ErrorMessage } from 'formik';  
import StoryContext from "../Components/StoryContext";  
import { useContext } from "react";  
import * as Yup from 'yup';  
import { useParams } from 'react-router-dom';  
  
function Write() {  
  const { id } = useParams();  
  const { handleSubmit } = useContext(StoryContext);  
  const [initialValues, setInitialValues] = useState({  
   image: '',  
   title: '',  
   story: '',  
  });  
  const [isLoaded, setIsLoaded] = useState(false);  
  
  useEffect(() => {  
   if (id) {  
    fetch(`/stories/${id}`)  
      .then((response) => response.json())  
      .then((story) => {  
       setInitialValues({  
        image: story.image,  
        title: story.title,  
        story: story.story,  
       });  
       setIsLoaded(true);  
      });  
   } else {  
    setIsLoaded(true);  
   }  
  }, [id]);  
  
  const validationSchema = Yup.object().shape({  
   title: Yup.string().required('Title is required'),  
   story: Yup.string().required('Story is required'),  
  });  
  
  const onSubmit = (values, { setSubmitting }) => {  
   const formData = new FormData();  
   formData.append('image', values.image);  
   formData.append('title', values.title);  
   formData.append('story', values.story);  
  
   if (id) {  
    fetch(`/stories/${id}`, {  
      method: 'PATCH',  
      body: formData,  
    })  
      .then((response) => response.json())  
      .then((data) => {  
       setSubmitting(false);  
      })  
      .catch((error) => {  
       console.error(error);  
       setSubmitting(false);  
      });  
   } else {  
    fetch('/stories', {  
      method: 'POST',  
      body: formData,  
    })  
      .then((response) => response.json())  
      .then((data) => {  
       handleSubmit(data);  
       setSubmitting(false);  
      })  
      .catch((error) => {  
       console.error(error);  
       setSubmitting(false);  
      });  
   }  
  };  
  
  if (!isLoaded) {  
   return <div>Loading...</div>;  
  }  
  
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
        <label className="Label">Add Image</label>  
        <Field type="text" name="image" placeholder="Add Image" />  
        <ErrorMessage name="image" component="div" />  
        <label className="Label">Title</label>  
        <Field type="text" name="title" placeholder="Title..." />  
        <ErrorMessage name="title" component="div" />  
        <label className="Label">Story</label>  
        <Field type="textarea" name="story" />  
        <ErrorMessage name="story" component="div" />  
        <input type="submit" value={id ? 'Save Changes' : 'Submit'} disabled={isSubmitting} />  
       </Form>  
      )}  
    </Formik>  
   </div>  
  );  
}  
  
export default Write;