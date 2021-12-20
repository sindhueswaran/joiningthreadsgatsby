import * as React from "react"
import { Link, graphql } from "gatsby" 
import Layout from "../../components/layout"
import { Container } from "react-bootstrap"
import Seo from "../../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"

const Product = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>
          No products found.  
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All Products" />
      <Container>
        
      <h2 className="section-title"> PRODUCTS </h2> 
      <ol className="product-list" style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li className="product-item" key={post.fields.slug}>
              <article > 
                <Link to={post.fields.slug} itemProp="url">
                  <h2>{title}</h2>
                  <br/>
                  <GatsbyImage
                    className="product-img"
                    image={post.frontmatter.fimg.childImageSharp.gatsbyImageData}
                    />
                    <p>{post.frontmatter.description}</p>
                </Link> 
              </article>
            </li>
          )
        })}
      </ol>
      
      </Container>
    </Layout>
  )
}

export default Product

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: {frontmatter: {template: {eq: "product"}}}) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          template
          description
          fimg {
            childImageSharp {
              gatsbyImageData(placeholder: TRACED_SVG,  height: 240)
            }
          }
        }
      }
    }
  }
`
