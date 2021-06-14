import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Container } from "react-bootstrap"
import { GatsbyImage } from "gatsby-plugin-image"  
import { SRLWrapper } from "simple-react-lightbox"
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const options = {
  settings: {
    overlayColor: "rgb(0, 0, 0, 0.95)",
  },
  buttons: { 
    showDownloadButton: false,
  },
  caption: {
    captionColor: "#fff",
    captionTextTransform: "capitalize",
    captionFontSize: '1rem',
  },
  thumbnails: {
    showThumbnails: false,
  }
};

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      

      <Seo title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt}/>

      <Container>
        <article className="blog-post">
          <header>
            <h2>{post.frontmatter.title}</h2>
            <p>{post.frontmatter.date}</p>
          </header>
          <GatsbyImage
            image={post.frontmatter.image.childImageSharp.gatsbyImageData}
            alt={post.frontmatter.title}
            className="post-image"
            />  
          <div dangerouslySetInnerHTML={{ __html: post.html }} /> 
             

          <div className="post-gallery">
            <SRLWrapper options={options}>
              {post.frontmatter.thumb.map((e, index) => {
              return (
                <a href={post.frontmatter.full[index].childImageSharp.gatsbyImageData.images.fallback.src}>
                  <GatsbyImage
                    image={e.childImageSharp.gatsbyImageData}
                    alt={e.name.split('-').join(' ').split('.')[0] } />
                </a>
              )})}
            </SRLWrapper>
          </div>

          <hr /> 
        </article>
      </Container>

      <nav className="blog-post-nav">
        <ul className="next-prev-item">
          <li> {previous && ( <Link to={previous.fields.slug} rel="prev"> <FaAngleLeft/> {previous.frontmatter.title} </Link>)}</li>
          <li> {next && ( <Link to={next.fields.slug} rel="next">{next.frontmatter.title} <FaAngleRight/></Link>)}</li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: {eq: $id}, frontmatter: {categories: {eq: "blog"}}) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        image {
          childImageSharp {
            gatsbyImageData(width: 320, placeholder: TRACED_SVG)
          }
        }
        thumb: imgset {
          childImageSharp {
            gatsbyImageData(
              placeholder: TRACED_SVG
              layout: CONSTRAINED
              height: 200 
            )
          }
          name
        }
        full: imgset {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
          name
        }  
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
