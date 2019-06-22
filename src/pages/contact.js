import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Head from "../components/head"

const contactPage = () => {
  return (
    <Layout>
      <Head title="Contact" />
      <h1>Contact</h1>
      <h2>Posts will show here</h2>
      <p>
        Tweet me
        <a href="www.twitter.com/toothy61" target="blank_">
          @Toothy61
        </a>
      </p>
    </Layout>
  )
}

export default contactPage
