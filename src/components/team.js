/** TEAM COMPONENT **/

import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
// import { Col, Row, Card, CardGroup} from 'react-bootstrap'  

const TEAMSECTION = {
  title: 'OUR TEAM',
  text: 'Barbara and Sindhu’s collaboration and friendship started spontaneously in 2018 when they met in Rishikesh.',
} 

const TEAM = [
    {
      name: 'Barbara Münz',
      image: 'team/yb.jpg',
      text: 'Barbara from Germany, is a mother and a yoga teacher who has been passionately creating and knitting for 50 years. She is a master crafts woman who shares her skills most generously.',
    },
    {
      name: 'Sindhu Eswaran',
      image: 'team/sindhu.jpg',
      text: 'Sindhu from India, is an enthusiastic, creative educator whose interests and wide range of skills have combined in her ongoing work with women and children.',
    },
  ];  

const Team = () => (
  <StaticQuery
    query={graphql`
      query {
        allFile(filter: {relativeDirectory: {eq: "team"}}) {
          edges {
            node {
              relativePath
              childImageSharp {
                gatsbyImageData(placeholder: DOMINANT_COLOR)
              }
            }
          }
        }
      }         
    `}
    render={data => (
    <section id="team"> 
      <h3 className="section-title"> {TEAMSECTION.title} </h3>  
      <p className="section-text"> {TEAMSECTION.text} </p>
        <div className="team-items row">
             {TEAM.map(({ name, image, text }) => {
                const img = data.allFile.edges.find(
                   ({ node }) => node.relativePath === image
                 ).node;

              return (
                <div className="team-member col g-5 p-5" key={name}>
                  <GatsbyImage
                    className="team-img" 
                    image={img.childImageSharp.gatsbyImageData}
                    alt={name}
                  />  
                  <div>
                    <h4>{name}</h4>
                    <p>{text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    />
  );
export default Team