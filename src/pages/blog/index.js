/** BLOG LIST PAGE **/

import * as React from "react"
import { Link, graphql } from "gatsby" 
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { Row, Col, Container } from "react-bootstrap"
import { GatsbyImage } from "gatsby-plugin-image"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="Blog" />
        <h2 className="section-title">Blog</h2> 
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Blog" />
      <Container>
 
      <h2 className="section-title">BLOG</h2> 
      <Row className="post-list ">
        {posts.map(post => {
          return (
            <Col md={6} key={post.id}>
              <article className="post-list-item" >
                <header>
                  <Link to={post.fields.slug}>
                    <GatsbyImage
                      image={post.frontmatter.image.childImageSharp.gatsbyImageData}
                      alt={post.frontmatter.title}
                      className="post-image"
                    /> 
                    <br/>
                      <h2 className="post-title">{post.frontmatter.title}</h2>
                    </Link>
                    <small>{post.frontmatter.date}</small>
                </header>
                <div>
                  <p dangerouslySetInnerHTML={{ __html: post.frontmatter.description || post.excerpt, }} />
                </div>
              </article>
              <hr/>
            </Col>
          )})}
      </Row>
      </Container>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {categories: {eq: "blog"}}}
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        id
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          image {
            childImageSharp {
              gatsbyImageData(width: 360, placeholder: TRACED_SVG, aspectRatio: 1.5)
            }
          }
        }
      }
    }
  }
`
