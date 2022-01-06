/** SUPPORT COMPONENT **/

import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Container } from "react-bootstrap";

const SUPPORTSECTION = {
  title: 'Would you like to help?',
} 

const SUPPORT = [
    {
      image: 'support/mandala1.png',
      text: 'By buying or selling these beautiful products from our colleagues.',
    },
    {
      image: 'support/mandala2.png',
      text: 'By donating wool, crochet and knitting needles for the women to use.',
    },
    {
      image: 'support/mandala3.png',
      text: 'By making a financial contribution towards our work.',
    },
  ];

const Support = () => (
  <StaticQuery
    query={graphql`
      query {
        allFile(filter: {relativeDirectory: {eq: "support"}}) {
          edges {
            node {
              relativePath
              childImageSharp {
                gatsbyImageData(placeholder: DOMINANT_COLOR)
              }
            }
          }
        }
      }         
    `}

 
  render={data => (
    <section id="support"> 
    <Container>

      <h3 className="section-title">{SUPPORTSECTION.title}</h3>   

      <div className="row support-items">
      {SUPPORT.map(({ image, text }) => {
            const img = data.allFile.edges.find(
               ({ node }) => node.relativePath === image
             ).node;  
            
        return (  
        <div className="col-12 col-sm-4 support-item" key={text}>
          <GatsbyImage
            className="support-img" 
            image={img.childImageSharp.gatsbyImageData}
            alt="Profile picture"
          />  
          <p>{text}</p> 
        </div> 
        )})}
      </div> 
      </Container>
    </section>
  )}
  />
);


export default Support
