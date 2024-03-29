import React from "react";
import {Avatar, Button, Chip, Dialog, DialogActions, DialogContent, Toolbar, Typography} from "@mui/material";
import {BfObject, trim} from "./utils";

interface DialogState {
    items: Array<BfObject>
    singleSelect: boolean
    height: string
}

interface DialogProperties {
    onOk: (items: Array<BfObject>) => void
    dataMode: 'single' | 'multiple'
    items: Array<BfObject>
    height?: string | undefined
    apiKey: string
}

export default class UiDialog extends React.Component<DialogProperties, DialogState> {

    constructor(props: DialogProperties) {
        super(props);

        this.state = {
            items: props.items,
            singleSelect: props.dataMode === 'single',
            height: props.height ?? '100%'
        }

    }

    componentDidMount() {
        window.addEventListener('message', (e: MessageEvent) => {
            if (e?.origin === 'https://integration-panel-ui.brandfolder-svc.com') {
                if (e?.data?.event === "selectedAttachment") {
                    this.setState({items: [...this.state.items, e.data.payload]}, () => this.state.singleSelect && this.props.onOk([e.data.payload]))
                }
            }
        });
    }


    deleteItem(item: BfObject) {
        const items = this.state.items.filter(value => value.id !== item.id);
        this.setState({items: items});
    }

    render() {
        const singleSelect = this.props.dataMode === 'single';
        return (<Dialog open={true} fullScreen>
                <DialogContent sx={{padding: 0}}>
                    <iframe title={"brandfolder"} frameBorder={0}
                            style={{
                                width: '100%',
                                height: this.state.height,
                                border: 'none',
                                // zoom: "0.75",
                                // transform: "scale(0.75)",
                                // transformOrigin: "0 0"
                            }}
                            src={`https://integration-panel-ui.brandfolder-svc.com/select-attachment?apikey=${encodeURI(this.props.apiKey)}&responsive=true&size=full&appName=bloomreach&origin=${window.location.protocol}//${window.location.host}`}/>
                </DialogContent>
                {!singleSelect &&
                    <DialogActions>
                        <Typography variant="body1">
                            Selected: &nbsp;
                        </Typography>
                        <div style={{flex: 6}}>
                            {this.state.items.map((item, index) =>
                                <Chip key={index}
                                      disabled={singleSelect}
                                      size={'medium'}
                                      variant={"outlined"}
                                      avatar={<Avatar sx={{cursor: 'pointer'}} variant={"circular"}
                                                      src={item.thumbnail_url ?? 'default'}
                                                      onClick={() => window.open(item.cdn_url, '_blank', 'noopener,noreferrer')}></Avatar>}
                                      label={item.filename ? trim(item.filename, 10) : undefined}
                                      onDelete={() => this.deleteItem(item)}
                                />
                            )}
                        </div>
                        <Button disabled={this.state.singleSelect} style={{flex: 1}} variant={"outlined"}
                                color={"primary"}
                                onClick={() => this.props.onOk(this.state.items)}>Ok</Button>
                    </DialogActions>
                }
            </Dialog>
        );
    }


}


