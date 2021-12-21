import * as React from "react"
import { Button } from 'react-bootstrap'  
import { Formik, Form, Field, ErrorMessage } from 'formik'
import  * as Yup from 'yup'
import FormError from "./formerror"
import { navigate } from "gatsby"

const initialValues = {
    name: '',
    email: '',
    message: '',
  }

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    message: Yup.string().required('Required'),
})


function encode(data) {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&")
  }

const onSubmit = (event) => {
  event.preventDefault()
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({
      "form-name": event.target.getAttribute("name"),
       
    })
  }).then(() => navigate("/thank-you/")).catch(error => alert(error))
}


// const onSubmit = values => { 
//     console.log(values)
//   }
 
const ContactForm = () => {

    return(
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
            <Form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="contact" value="contact" />
                <div className="form-control"> 
                <Field type="text" id="name" name="name" placeholder="Your Name" />
                <ErrorMessage name="name" component={FormError} />
                </div>
                 
                <div className="form-control"> 
                <Field type="email" id="email" name="email" placeholder="Your Email" />
                <ErrorMessage name="email" component={FormError} />
                </div>

                <div className="form-control"> 
                <Field as="textarea" id="message" name="message" placeholder="Your message" />
                <ErrorMessage name="message" component={FormError} />
                </div>
                  
                <Button className="btn" variant="outline-dark" type="submit">SUBMIT</Button>
                 
            </Form>
        </Formik>
    )
}

export default ContactForm
