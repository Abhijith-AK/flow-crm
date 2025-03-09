import { DragDropContext } from "@hello-pangea/dnd"

const KanbanBoard = ({ children, dragEndFn }) => {
    return (
        <DragDropContext onDragEnd={dragEndFn}>
            {children}
        </DragDropContext>
    )
}

export default KanbanBoard