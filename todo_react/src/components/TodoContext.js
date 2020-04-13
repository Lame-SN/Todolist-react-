import React from 'react'

const TodoContext = React.createContext({
    onUpdate: () => {},
    onDelete: () => {},
})

export default TodoContext
