/** FOOTER COMPONENT **/

import * as React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import { Nav } from 'react-bootstrap' 
 
const Footer = () => {
    const data = useStaticQuery(graphql`
        query FooterQuery {
            site {
                siteMetadata {
                nav {
                    name
                    url
                }
                title
                }
            }
        }
    `
)

const nav = data.site.siteMetadata?.nav
    return (
        <>
            <footer>
                <Nav className="justify-content-center" activeKey="/">
                    {nav.map((data, index) => {
                        return (  
                            <Nav.Item key={{index}}>
                                <Link to={data.url} className="nav-link" activeClassName="nav-active">{data.name}</Link>
                            </Nav.Item> 
                    )})}
                </Nav> 
                <p className="text-center"> Property of Joining Threads © {new Date().getFullYear()}  </p>
            </footer>

            <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script> 
            <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin></script> 
            <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script> 
            <script>var Alert = ReactBootstrap.Alert;</script>
        </>
    )
}
 
export default Footer