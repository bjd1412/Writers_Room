


import React, { useState, useEffect } from 'react';  
import { Formik, Form, Field, ErrorMessage } from 'formik';  
import StoryContext from "../Components/StoryContext";  
import { useContext } from "react";  
import * as Yup from 'yup';  
import { useParams, useNavigate } from 'react-router-dom';  
  
function Write() {  
  const { id } = useParams();  
  const { handleSubmit, user } = useContext(StoryContext);  
  const navigate = useNavigate();  
  const [initialValues, setInitialValues] = useState({  
   image: '',  
   title: '',  
   story: '',  
  });  
  const [isLoaded, setIsLoaded] = useState(false);  
  const [story, setStory] = useState(null);
  

  
  useEffect(() => {  
   if (id) {  
    fetch(`/stories/${id}`)  
      .then((response) => response.json())  
      .then((story) => {  
       setStory(story);  
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
  
  useEffect(() => {  
   if (!user) {  
    navigate('/login');  
   } else if (id && story && story.user_id !== user.id) {  
    navigate('/login');  
   }  
  }, [user, id, story]);  
  
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
       navigate(`/account/${user.username}`)  
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
       navigate('/explore')  
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
       <Field type="text" name="image" placeholder="Add image..." className="google-docs-input" />  
       <ErrorMessage name="image" component="div" />  
       <Field type="text" name="title" placeholder="Title..." className='google-docs-input'/>  
       <ErrorMessage name="title" component="div" />    
       <div className="writing-container">  
        <div className="scrolling-container">  
          <div className="page-wrapper">  
           <Field component="textarea" name="story" className='google-docs-textarea' placeholder="Start writing..." wrap="hard" />  
          </div>  
        </div>  
       </div>  
       <ErrorMessage name="story" component="div" />  
       <input type="submit" value={id ? 'Save Changes' : 'Submit'} disabled={isSubmitting} className='google-docs-button' />  
      </Form>  
    )}  
   </Formik>  
  </div>  
);
}  
  
export default Write