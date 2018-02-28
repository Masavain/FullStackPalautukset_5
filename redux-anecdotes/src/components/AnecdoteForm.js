import React from 'react'
import actionFor from '../actionCreators'

class AnecdoteForm extends React.Component {
    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() =>
          this.forceUpdate()
        )
      }
    
      componentWillUnmount() {
        this.unsubscribe()
      }
    
      addAnecdote = (event) => {
        event.preventDefault()
        this.props.store.dispatch(
            actionFor.anecdoteCreation(event.target.content.value)
        )
        event.target.content.value = ''
    }
    render() {
        return (
            <form onSubmit={this.addAnecdote}>
                <input name="content" />
                <button>lisää</button>
            </form>
        )
    }
}

export default AnecdoteForm