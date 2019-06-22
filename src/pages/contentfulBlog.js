import React from "react"
import Layout from "../components/layout"
import { Link, graphql, useStaticQuery } from "gatsby"
import blogStyles from "./blog.module.scss"

import Head from "../components/head"
const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
            title
            slug
            publishedDate(fromNow: true)
            thumbnail {
              title
              file {
                url
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Head title="Contentful" />
      <h1>Contentful Blog</h1>
      <ol className={blogStyles.posts}>
        {data.allContentfulBlogPost.edges.map(edge => {
          return (
            // let sluglink =
            <li className={blogStyles.post}>
              <Link to={`/contentfulBlog/${edge.node.slug}`}>
                <img
                  src={edge.node.thumbnail.file.url}
                  className="img-fluid"
                  alt={edge.node.thumbnail.title}
                  width="300"
                  height="300"
                />
                <h2>{edge.node.title}</h2>
                <span>
                  <p>Written On: {edge.node.publishedDate}</p>
                  {/* <p className="text-primary">
                  Read Time :{edge.node.timeToRead}
                </p> */}
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogPage
