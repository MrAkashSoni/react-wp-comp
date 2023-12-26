/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"

import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <div className={""}>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
