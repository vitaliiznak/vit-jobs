import { Avatar } from 'antd'
import React, { Component, CSSProperties } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'

// fake data generator
const getApplied = (count, offset = 0) =>
    Array.from({ length: count }, (_v, k) => k).map((k) => ({
        id: `item-${k + offset}`,
        name: `Vitalii Znak ${k + offset}`,
    }))

// a little function to help us with reordering the result
const reorder = (source, startIndex, endIndex) => {
    const result = Array.from(source.data)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return { ...source, data: result }
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source.data)
    const destClone = Array.from(destination.data)
    const [removed] = sourceClone.splice(droppableSource.index, 1)
    destClone.splice(droppableDestination.index, 0, removed)
    const result = {}
    result[droppableSource.droppableId] = { ...source, data: sourceClone }
    result[droppableDestination.droppableId] = { ...destination, data: destClone }

    return result
}

const grid = 8
const getAppliedStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the applied look a bit nicer
    userSelect: 'none',
    padding: 10,
    margin: `0 0 ${grid}px 0`,
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '#fafafa',
    border: '1px solid #bccdd7',
    // styles we need to apply on draggables
    ...draggableStyle,
})

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'transparent',
    overflowY: 'auto',
    padding: '0 8px',
    height: 'calc(100% - 4px)',
    width: 250,
} as CSSProperties)

const totalApplications = 24
const columns = {
    applied: { title: 'Applied', data: getApplied(10) },
    toScreen: { title: 'Screening', data: getApplied(5, 10) },
    toInterview: { title: 'Interview', data: getApplied(1, 20) },
    toEvaluation: { title: 'Evaluation', data: getApplied(1, 21) },
    offer: { title: 'Offer', data: getApplied(1, 22) },
    finish: { title: 'Finish', data: getApplied(1, 23) },
}

const CandidateThumbnail = ({ item }) => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '80px' }} >
        <div style={{ display: 'flex' }} >
            <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
            <div>
                <div>
                    {item.name}
                </div>

            </div>

        </div>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
            <Link to={`candidates/${1}`}>DETAILS</Link>
        </div>
    </div>

)

type TypeAppications = Array<{ id: string, content: string }>
class App extends Component<any, any> {
    public state = {
        ...columns,
    }
    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the applied container to the names of the
     * source arrays stored in the state.
     */
    private getList = (id) => this.state[id]

    private onDragEnd = (result) => {
        const { source, destination } = result

        // dropped outside the list
        if (!destination) {
            return
        }

        if (source.droppableId === destination.droppableId) {
            const applied: TypeAppications = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index,
            ) as TypeAppications
            this.setState({ [source.droppableId]: applied })
        } else {
            // show action
            // destination.droppableId
            const result: any = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination,
            )
            this.setState((_state) => ({
                ...result,
            }))
        }
    }

    private renderColumn = (key) => (
        <div key={key} style={{ height: 'calc(100% - 30px)' }}>
            <div style={{ padding: '0 8px' }}>
                <h3>{this.getList(key).title} ({this.state[key].data.length})</h3>
            </div>
            <Droppable droppableId={key}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {this.state[key].data.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided1, snapshot1) => (
                                    <div
                                        ref={provided1.innerRef}
                                        {...provided1.draggableProps}
                                        {...provided1.dragHandleProps}
                                        style={getAppliedStyle(
                                            snapshot1.isDragging,
                                            provided1.draggableProps.style,
                                        )}
                                    >
                                        <CandidateThumbnail item={item} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    public render() {
        return (
            <div style={{ padding: '30px 40px', height: '1000px' }}>
                <div style={{ display: 'flex', width: '100%', height: '100%', overflowX: 'auto' }}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {Object.keys(columns).map(this.renderColumn)}
                    </DragDropContext>
                </div>
            </div>

        )
    }
}

export default App
