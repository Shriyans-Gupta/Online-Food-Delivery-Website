import React from "react";
import {MdStar , MdOutlineStarHalf , MdOutlineStarOutline} from 'react-icons/md';

const color = {color : '#f8e825'}
const span = {marginLeft : '0.5rem'}

const Rating = ({value , text}) => {
    return (
        <>
                   {
                       [1,2,3,4,5].map(index => (
                        <span key={index}>
                        {value >=index ? 
                       <MdStar style={color}/> : value >=(index - 0.5) ?
                       <MdOutlineStarHalf style={color}/> :
                       <MdOutlineStarOutline style={color}/>
                        }
                       </span>
                       )) 
                   }
               <span style={span}>{text && text}</span>
        </>
    )
}

export default Rating;
