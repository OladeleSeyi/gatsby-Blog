import React from "react"
import { Link } from "gatsby"

import Head from "../components/head"
import Layout from "../components/layout"

const NotFound = () => {
  return (
    <Layout>
      <Head title="404 Page" />
      <h1>Page not Found</h1>
      <p>
        <Link to="/ " className="text - warning">
          Head Home
        </Link>
      </p>
    </Layout>
  )
}

export default NotFound
