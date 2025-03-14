import { Draggable } from '@hello-pangea/dnd'
import React from 'react'

const DragCard = ({ children, cardId, index }) => {
    return (
        <Draggable key={cardId} draggableId={cardId} index={index}>
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