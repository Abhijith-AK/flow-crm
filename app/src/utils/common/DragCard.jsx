import { Draggable } from '@hello-pangea/dnd'
import React from 'react'

const DragCard = ({ children, key, cardId, index }) => {
    return (
        <Draggable key={key} draggableId={cardId} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {children}
                </div>
            )}
        </Draggable>
    )
}

export default DragCard