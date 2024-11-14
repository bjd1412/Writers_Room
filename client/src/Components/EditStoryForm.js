import React, { useState } from 'react';  
import { Formik, Form, Field, ErrorMessage } from 'formik';  
  
const EditStoryForm = ({ story, handleEditSubmit,  }) => {  
  const [title, setTitle] = useState(story.title);  
  const [image, setImage] = useState(story.image);  
  const [content, setContent] = useState(story.content);  
  
  const handleSubmit = (values, { setSubmitting }) => {  
    const formData = new FormData();  
    formData.append('title', values.title);  
    formData.append('content', values.content);  
    formData.append('image', values.image);  
    formData.append('user_id', story.user_id);  
    
    handleEditSubmit(formData);  
    setSubmitting(false);  
  };
  
  return (  
   <Formik  
    initialValues={{ title, image, content }}  
    onSubmit={handleSubmit}  
   >  
    {({ isSubmitting }) => (  
      <Form>  
       <Field type="text" name="title" />  
       <ErrorMessage name="title" component="div" />  
       <Field type="text" name="image" />  
       <ErrorMessage name="image" component="div" />  
       <Field type="textarea" name="content" />  
       <ErrorMessage name="content" component="div" />  
       <button type="submit" disabled={isSubmitting}>  
        Save Changes  
       </button>  
      </Form>  
    )}  
   </Formik>  
  );  
};  
  
export default EditStoryForm;