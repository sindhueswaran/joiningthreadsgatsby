/** HERO COMPONENT **/

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge" 
import { Button  } from 'react-bootstrap'

const Hero = () => {
  const { HeroImage } = useStaticQuery(
    graphql`
     query {
      HeroImage: file(relativePath: {eq: "hero.jpg"}) {
        childImageSharp {
          gatsbyImageData(placeholder: TRACED_SVG)
        }
      }
    }
 `)
 
  const pluginImage = getImage(HeroImage)

  return (
        <BgImage
          className="hero-image"
          image={pluginImage}
          backgroundColor={`#2a7ac9`} 
          > 
          <div className="hero-overlay">
          <div className="hero-text">
            <h1> Joining threads <br/> Joining lives </h1>< br/>
            <h4 className="mb-3">Encouraging creativity empowers and strengthens our resourcefulness and talent, 
            availing possibilities to improve livelihoods. We share craft skills with women 
            and children in projects located in North India.</h4>
            <Button className="btn" variant="outline-light" href="/blog">OUR PROJECTS</Button>
          </div>
          </div>
        </BgImage>
     
  
    )
  }

export default Hero
