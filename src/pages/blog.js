import React from "react"
import Layout from "../components/layout"
import { Link, graphql, useStaticQuery } from "gatsby"
import blogStyles from "./blog.module.scss"
import Head from "../components/head"

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
            }
            timeToRead
            excerpt
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Head title="Blog" />
      <h1>Blog</h1>
      <ol className={blogStyles.posts}>
        {data.allMarkdownRemark.edges.map(edge => {
          return (
            // let sluglink =
            <li className={blogStyles.post}>
              <Link to={`/blog/${edge.node.fields.slug}`}>
                <h2>{edge.node.frontmatter.title}</h2>
              </Link>
              <span>
                <p>Written On: {edge.node.frontmatter.date}</p>
                <p className="text-primary">
                  Read Time :{edge.node.timeToRead}
                </p>
              </span>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogPage
