/**  WhatWeDo COMPONENT **/

import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Container } from "react-bootstrap"

const WHATWEDOSECTION = {
  title: 'What we do',
} 

const WHATWEDO = [
    {
      title: 'Women Skill Building',
      image: 'whatwedo/knitting.jpg',
      text: 'We work with womens groups sharing knitting, crochet, felting and sewing techniques through workshops for NGOs in New Delhi, Rajasthan and Uttarakhand.',
    },
    {
      title: 'Education',
      image: 'whatwedo/children.jpg',
      text: 'We offer teacher trainings and workshop-classes with children and youth using arts and crafts to facilitate various ways of learning through activities in the classroom.',
    },
    {
      title: 'Encouraging wealth for women',
      image: 'whatwedo/markets.jpg',
      text: 'We intend to link groups within our network who can purchase the products that will directly earn money for the women. For e.g. Atma Seva buys felted hot water bottle covers and knitted hand warmers and La Volotte in Germany bought cloth bags and felted buttons from Jan Madhyam. We also aim to encourage the women to form small co-operatives who can learn how to setup local outlets to sell their crafts independently.',
    },
  ];

const WhatWeDo = () => (
  <StaticQuery
    query={graphql`
      query {
        allFile(filter: {relativeDirectory: {eq: "whatwedo"}}) {
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
    <section id="whatwedo">
      <Container>  
        <h2 className="section-title">{WHATWEDOSECTION.title}</h2>
        <div className="wwd-items"> 
          {WHATWEDO.map(({ title, image, text }) => {
            const img = data.allFile.edges.find(
               ({ node }) => node.relativePath === image
             ).node;  
            
            return (  
            <article className="row wwd-item" key={title}>
              <div className="col-12 col-md-5  col-lg-4 offset-lg-1 wwd-img">
              <GatsbyImage 
                image={img.childImageSharp.gatsbyImageData}
                alt="Profile picture"
              /> 
              </div>
              
              <div className="col-12 col-md-6 col-lg-6 offset-lg-1 wwd-text ">
              <h4 className="text-center mb-3">{title}</h4>
              <p>{text}</p> 
              </div>
              
            </article> 
            );
          })}
        </div> 
        
      </Container>  
    </section>    
    )}
    />
  );
 

export default WhatWeDo
