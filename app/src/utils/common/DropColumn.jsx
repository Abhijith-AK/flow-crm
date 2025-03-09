import { Droppable } from '@hello-pangea/dnd'
import React from 'react'

const DropColumn = ({ children, colId }) => {
    return (
        <Droppable droppableId={colId}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {children}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default DropColumn