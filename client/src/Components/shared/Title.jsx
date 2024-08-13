
// import React from "react";
import  {  HelmetProvider } from "react-helmet-async";

const Title = ({title,description}) =>{
    return <HelmetProvider>
        <title>{title}</title>
        <meta name="description" content={description}/>
    </HelmetProvider>
}

export default Title;