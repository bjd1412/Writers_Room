import React from "react";  
import { Formik, Form, Field, ErrorMessage } from 'formik';  
import StoryContext from "./StoryContext";  
import { useContext } from "react";  
import * as Yup from 'yup';  

function AddComment ({storyId}) {
    console.log('storyId:', storyId);

    const { handleSubmitComments } = useContext(StoryContext);

    const initialValues = {  
        comment: ''  
       };  
       
       const validationSchema = Yup.object().shape({  
        comment: Yup.string().trim().required('Comment cannot be empty'),
       });  
       
       const onSubmit = (values, { setSubmitting }) => {  
        const formData = new FormData();  
        formData.append('comment', values.comment);
        formData.append('story_id', storyId);    
       
        fetch("/comments", {  
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
         .then(newComment => {  
           console.log('newComment:', newComment);  
           handleSubmitComments(newComment);  
         })  
         .catch(error => {  
           console.error('Error:', error);  
         });  
        setSubmitting(false)  
       };  
       


    return (
        <div className="CommentSection">
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (  
       <Form className="NewWrite">  
        <Field type="text" name="comment" placeholder="Add a comment"/>
        <ErrorMessage name="comment" component="div" />
        <input type="submit" value="Comment" disabled={isSubmitting} />  
       </Form>  
      )}

            </Formik>
        </div>
    )
}

export default AddComment