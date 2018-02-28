import React from 'react'

const Anecdote = ({anecdote, handleClick}) => {
    return(
      <li onClick={handleClick}>
        {anecdote.content} 
        <div>
        has {anecdote.votes}
        </div>
      </li>
    )
  }

  export default Anecdote