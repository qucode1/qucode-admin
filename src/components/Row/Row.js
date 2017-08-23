import React from 'react'
import { Link } from 'react-router-dom'


const Row = (props) => (
  <div>
    <h2 >{!props.details ? <Link to={`/rows/${props._id}`} >{props.name}</Link> : props.name}</h2>
    {props.details && props.text && <p>{props.text.content}</p>}
    {(props.details && props.skills)
    ? props.skills.map( skill => {
      <p>{skill.name}</p>
    })
    : null
    }
    {props.details && <Link to='/rows' >Go back to Rows</Link>}
  </div>
)

export default Row
