/**HEADER COMPONENT **/

import * as React from "react"
import { Link } from "gatsby"; 
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
    const data = useStaticQuery(graphql`
        query HeaderQuery {
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
        <Container>
            <Navbar fixed="top" expand="lg" variant="light" bg="light">
            <Navbar.Brand href="/">  
                <StaticImage
                    className="logo"
                    layout="fixed"
                    formats={["AUTO", "WEBP", "AVIF"]}
                    src="../images/jtjllogo.png"
                    width={60}
                    height={60}
                    quality={95}
                    alt="Joining Threads Logo"
                />
            </Navbar.Brand>   
            <Navbar.Toggle  aria-controls="jtnavbar"/> 
            <Navbar.Collapse className="justify-content-end" id="jtnavbar">
                <Nav className="justify-content-center" >
                    {nav.map((data, index) => {
                        return (  
                            <Nav.Item key={{index}}>
                                <Link to={data.url} className="nav-link" activeClassName="nav-active">{data.name}</Link>
                            </Nav.Item> 
                        )})}
                </Nav>
            </Navbar.Collapse>
        </Navbar>   
    </Container>
 
    </>
  )
}

export default Header
