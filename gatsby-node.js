const path = require("path")
require("dotenv").config()
console.log(process.env.CONTENTFUL_SPACE_ID)

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(node.fileAbsolutePath, ".md")
    // console.log(JSON.stringify(node, undefined, 4))
    // console.log("@@@@@@@@@@@@@@@@@@@@", slug)

    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}
module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve("./src/templates/blog.js")
  const blogcTemplate = path.resolve("./src/templates/contentfulBlog.js")
  const res = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const rest = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  res.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    })
  })
  rest.data.allContentfulBlogPost.edges.forEach(edge => {
    createPage({
      component: blogcTemplate,
      path: `/contentfulBlog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
      },
    })
  })
}

// module.exports.createmPages = async ({ graphql, actions }) => {
//   const { createPage } = actions
//   const blogTemplate = path.resolve("./src/templates/contentfulBlog.js")
//   const res = await graphql(`
//     query {
//       allContentfulBlogPost {
//         edges {
//           node {
//             slug
//           }
//         }
//       }
//     }
//   `)
//   console.log(res)

//   res.data.allContentfulBlogPost.edges.forEach(edge => {
//     createPage({
//       component: blogTemplate,
//       path: `/contentfulBlog/${edge.node.slug}`,
//       context: {
//         slug: edge.node.slug,
//       },
//     })
//   })
// }
