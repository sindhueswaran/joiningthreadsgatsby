// custom typefaces
import "@fontsource/pacifico"
import "@fontsource/oranienbaum"
import "@fontsource/roboto"

// CSS
import "./src/styles/global.scss"
import 'bootstrap/dist/css/bootstrap.min.css';

// Simple React Lightbox wrapper
import React from 'react' 
import SimpleReactLightbox from 'simple-react-lightbox'

export const wrapRootElement = ({ element }) => (
    <SimpleReactLightbox>
      {element}
    </SimpleReactLightbox>
)