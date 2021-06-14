import React from 'react'

function FormError (props) {
    return(
        <div className="error">
          <small> {props.children} </small>  
        </div>
    )
}  

export default FormError