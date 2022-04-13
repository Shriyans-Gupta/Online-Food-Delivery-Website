import React from "react";

const Footer = () => {
    
    const foot ={
        position : "absolute",
        textAlign: 'center',
        bottom: ' 0',
        width: '100%',
        padding : '1% 0',
        backgroundColor : "#F0ECE3"
    }
    const today = new Date();
    const year = today.getFullYear();
    return (
        <footer style={foot}>
               <strong>© Copyright Reserved {year}</strong>
        </footer>
         )
}

export default Footer ; 