import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"
import { Container } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const ProductTemplate = ({ data, location }) => {
  const product = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const settings = {
    autoPlay: true,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1, 
    cssEase: 'linear'
  };

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={product.frontmatter.title}
        description={product.frontmatter.description || product.excerpt}
      />
      <Container>
      <h2 className="section-title"> </h2> 
      <article className="product-post">
        <div className="product-info">
          <div className="product-image">
            <Slider {...settings}>
              {product.frontmatter.imgset.map((img, i) => (
                <div key={i}>
                  <GatsbyImage 
                    image={img.childImageSharp.gatsbyImageData}
                    alt={img.name.split('-').join(' ').split('.')[0] }
                  />
                  {/* <p> {img.name.split('-').join(' ').split('.')[0] } </p> */}
                </div>
                ))}
            </Slider>              
          </div>

          <div className="product-details">
            <h2>{product.frontmatter.title}</h2>
            <h4>{product.frontmatter.material}</h4> 
            <h6>Rs. {product.frontmatter.price}</h6> 
            <p>{product.frontmatter.description}</p> 
          </div>
        
        </div>

        <section dangerouslySetInnerHTML={{ __html: product.html }} />
        
      </article>

      

{/*PRODUCT NAV BOTTOM*/}
     
        <nav className="product-post-nav">
          <hr />
          <ul className="product-post-nav-item">
            <li>{previous && (<Link className="product-post-nav-link" to={previous.fields.slug} rel="prev">
            <FontAwesomeIcon icon={ faChevronLeft } /> {previous.frontmatter.title}   
              </Link>)}
            </li>
            <li>{next && (<Link  className="product-post-nav-link" to={next.fields.slug} rel="next">
            {next.frontmatter.title}  <FontAwesomeIcon icon={ faChevronRight } /> 
              </Link>)}
            </li>
          </ul>
        </nav>
     </Container>
    </Layout>
  )
}

export default ProductTemplate

export const pageQuery = graphql`
  query  ProductBySlug(
    $id: String!
    $previousProductId: String
    $nextProductId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title 
        material
        price
        description
        imgset {
          name
          childImageSharp {
            gatsbyImageData(placeholder: TRACED_SVG)
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousProductId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextProductId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
