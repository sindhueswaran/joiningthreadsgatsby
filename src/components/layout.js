/** LAYOUT COMPONENT **/
import * as React from "react"
// import { Link } from "gatsby"
import Footer from "./footer"
import Header from "./header"
import Hero from "../components/hero"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <>
      <Header/>
      <Hero/>
      </>
    )
  } else {
    header = (
      <>
      <Header/> 
      </>
    )
  }

  return (
    <div  data-is-root-path={isRootPath}>
      <header>{header}</header>
      <main>{children}</main>
      <Footer/>
    </div>
  )
}

export default Layout
