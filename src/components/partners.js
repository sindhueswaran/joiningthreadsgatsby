/** PARTNERS COMPONENT **/

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container } from 'react-bootstrap'

const Partners = ( ) => {
  const data = useStaticQuery(graphql`
    query PartnersQuery {
      allFile(filter: {relativeDirectory: {eq: "partners"}}) {
        nodes {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, height: 280)
          }
          name
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const nodes = data.allFile.nodes

  return (
    <section id="partners">  
      <Container>  
      <h3 className="section-title"> Currently we work with </h3>  
        <div className="row col-md-10 offset-md-1 col-lg-8 offset-lg-2 text-center">
          {nodes.map((image, index)=>{
            const {name} = image
            const pathToImage = getImage(image)
            return(
              <div className="col-md-6 col-lg-4 partners-logo" key={index} >
                <GatsbyImage 
                image={pathToImage} 
                alt={name}/>                      
              </div>
            )})}    
          </div>
      </Container>    
    </section>
  )
}

export default Partners
