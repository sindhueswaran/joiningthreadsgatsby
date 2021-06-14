/** INDEX PAGE **/

import * as React from "react"
import { graphql } from "gatsby"
import WhatWeDo from "../components/whatwedo"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Team from "../components/team"
import { Container } from "react-bootstrap"
import Partners from "../components/partners"
import Support from "../components/support"
import Contact from "../components/contact"


const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  // const posts = data.allMarkdownRemark.nodes

  return ( 
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <Container>
      <WhatWeDo />
      <Partners />
      <Team />
      <Support />
      <Contact/>
      </Container>
    </Layout> 
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
