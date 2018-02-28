import React from 'react'
import actionFor from '../actionCreators'
import PropTypes from 'prop-types'
import Note from './Note'
import Anecdote from './Anecdote';

class NoteList extends React.Component {
    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    toggleImportance = (id) => () => {
        this.context.store.dispatch(
            actionFor.importanceToggling(id)
        )
    }
    render() {
        return (
            <ul>
                {this.context.store.getState().map(a =>
                    <Anecdote
                        key={a.id}
                        note={a}
                        handleClick={this.toggleImportance(a.id)}
                    />
                )}
            </ul>
        )
    }
}
NoteList.contextTypes = {
    store: PropTypes.object
}

export default NoteList