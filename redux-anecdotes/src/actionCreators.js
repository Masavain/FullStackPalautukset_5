const getId = () => (100000 * Math.random()).toFixed(0)

export default {
    anecdoteCreation(content) {
        return {
            type: 'NEW_ANECDOTE',
            data: {
                content,
                id: getId(),
                votes: 0
            }
        }
    },
    vote(id) {
        return {
            type: 'VOTE',
            data: { id }
        }
    }
}

