import React from "react";
import {DragDropContext, Draggable, Droppable, DropResult, ResponderProvided} from "react-beautiful-dnd";
import {Button, ButtonBase, Grid, IconButton} from "@mui/material";
import {styled} from '@mui/material/styles';
import {BfObject, reorder} from "./utils";
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

interface FieldState {
    items: Array<BfObject>
    editMode: boolean
    singleSelect: boolean
}

interface FieldProperties {
    onChange: (items: Array<BfObject>) => void
    onOpenDialog: (items: Array<BfObject>) => void
    dataMode: 'single' | 'multiple'
    editMode: boolean
    items: Array<BfObject>
}

export default class UiField extends React.Component<FieldProperties, FieldState> {

    constructor(props: FieldProperties) {
        super(props);

        this.state = {
            items: this.props.items,
            editMode: props.editMode,
            singleSelect: props.dataMode === 'single'
        }
        this.onDragEnd = this.onDragEnd.bind(this);
    }


    onDragEnd(result: DropResult, provided: ResponderProvided): void {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        }, () => this.props.onChange(this.state.items));
    }

    render() {
        const {editMode, singleSelect, items} = this.state;
        return (
            <>
                <Grid container sx={{minWidth: '375px'}} spacing={1}>
                    {editMode &&
                    <Grid sx={{paddingLeft: 0}} item>
                        <List sx={{paddingY: 0, paddingLeft: 0}}>
                            <ListItem sx={{paddingLeft: 0}}>
                                <Button size={"small"} sx={{display: editMode ? 'block' : 'none'}}
                                        variant="outlined"
                                        onClick={() => this.props.onOpenDialog(items)}>{singleSelect ? 'Select' : 'Add'}</Button>
                            </ListItem>
                            <ListItem sx={{paddingLeft: 0}}>
                                <Button size={"small"} sx={{display: editMode ? 'initial' : 'none'}}
                                        variant="outlined"
                                        disabled={items.length < 1}
                                        onClick={() => this.setState({items: []}, () => this.props.onChange([]))}>{singleSelect ? 'Clear' : 'Clear All'}</Button>
                            </ListItem>
                        </List>
                    </Grid>}
                    <Grid item xs={8} sx={{paddingLeft: 0}}>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable isDropDisabled={!editMode} droppableId="droppable" direction={'horizontal'}>
                                {(droppableProvided, droppableSnapshot) => (
                                    <List sx={{height: '100%', paddingLeft: 0}} row={true}
                                          ref={droppableProvided.innerRef}>
                                        {items.map((item: any, index: number) => (
                                            <Draggable isDragDisabled={!editMode} key={item.id} draggableId={item.id}
                                                       index={index}>
                                                {(draggableProvided, draggableSnapshot) => (
                                                    <ListItem sx={{height: '100%', paddingLeft: 0}}
                                                              key={item.thumbnail_url}
                                                              ref={draggableProvided.innerRef}
                                                              {...draggableProvided.draggableProps}
                                                              {...draggableProvided.dragHandleProps}>
                                                        <Grid item sx={{paddingTop: 0}}>
                                                            <ButtonBase sx={{width: 75, height: 75}}
                                                                        onClick={() => window.open(item.cdn_url, '_blank', 'noopener,noreferrer')}>
                                                                <Img alt="complex" src={item.thumbnail_url}/>
                                                            </ButtonBase>
                                                        </Grid>
                                                        {(!singleSelect && editMode && items.length > 1) &&
                                                        <Grid item sx={{maxWidth:'35px'}}>
                                                            <IconButton
                                                                size={"small"}
                                                                disabled={!editMode}
                                                                onClick={() => {
                                                                    this.setState({
                                                                        items: this.state.items.filter(function (i: any) {
                                                                            return item.id !== i.id
                                                                        })
                                                                    }, () => this.props.onChange(this.state.items));
                                                                }}>
                                                                <ClearOutlinedIcon/>
                                                            </IconButton>
                                                            <IconButton size={"small"}
                                                                        disabled={!editMode} sx={{cursor: "grab"}}>
                                                                <DragHandleOutlinedIcon/>
                                                            </IconButton>
                                                        </Grid>}
                                                    </ListItem>
                                                )}
                                            </Draggable>
                                        ))}
                                    </List>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </Grid>
                </Grid>
            </>);
    }


}