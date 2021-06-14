/** CONTACT COMPONENT **/

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Col } from 'react-bootstrap'
import { FaEnvelope } from 'react-icons/fa';
import ContactForm from "./form";

const Contact = () => {
   const data = useStaticQuery(graphql`
     query ContactQuery {
      site {
        siteMetadata {
          email
          title
        }
      }
    }
`)

const email = data.site.siteMetadata.email
  return (
    <section id="contact"> 
      <div  className="mb-5">
        <h3 className="section-title"> Write to us </h3> 
          <a className="email-link" href="mailto:{email}"> 
        <p className="section-text"> 
          <FaEnvelope /> &nbsp; {email} </p>
        </a>
      </div> 
      <Col xs md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
        <ContactForm/>
      </Col>
    </section>
  )
}

export default Contact
