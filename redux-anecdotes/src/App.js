import React from 'react';


class App extends React.Component {
  addAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch({ type: 'NEW_ANECDOTE', data: {content: event.target.content.value}})
    event.target.content.value = ''
  }

  vote = (id) => () => {
    this.props.store.dispatch({ type: 'VOTE', data: { id: id }})
  }
  
  render() {
    const sortAnecdotes = this.props.store.getState().sort(function (a, b) {
      return b.votes - a.votes
    })

    return (
      <div>
        <h2>Anecdotes</h2>
        {sortAnecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <input name="content"/>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App