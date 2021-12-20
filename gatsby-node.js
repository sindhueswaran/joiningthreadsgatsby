const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions



  /* BLOGS */
  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`) 

  // Get all markdown blog posts sorted by date
  const blogresult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: {frontmatter: {template: {eq: "blog"}}}
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (blogresult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      blogresult.errors
    )
    return
  }

  const posts = blogresult.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

/* PRODUCTS */
// Define a template for products
const productPost = path.resolve(`./src/templates/product-post.js`)

// Get all markdown product posts
const productresult = await graphql(
  `
    {
      allMarkdownRemark(
        filter: {frontmatter: {template: {eq: "product"}}} 
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `
)

if (productresult.errors) {
  reporter.panicOnBuild(
    `There was an error loading your blog posts`,
    productresult.errors
  )
  return
}

const products = productresult.data.allMarkdownRemark.nodes

// Create blog posts pages
// But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
// `context` is available in the template as a prop and as a variable in GraphQL

if (products.length > 0) {
  products.forEach((product, index) => {
    const previousProductId = index === 0 ? null : products[index - 1].id
    const nextProductId = index === products.length - 1 ? null : products[index + 1].id

    createPage({
      path: product.fields.slug,
      component: productPost,
      context: {
        id: product.id,
        previousProductId,
        nextProductId,
      },
    })
  })
}



}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}


exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
