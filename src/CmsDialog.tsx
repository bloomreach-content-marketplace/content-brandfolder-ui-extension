import React from "react";
import {BfObject, UiConfig} from "./utils";
import {UiScope} from "@bloomreach/ui-extension";
import UiDialog from "./UiDialog";

interface CmsDialogState {
    items: Array<BfObject>
    singleSelect: boolean
    apiKey: string
    height?: string
}

interface CmsDialogProperties {
    ui: UiScope
}

export default class CmsDialog extends React.Component<CmsDialogProperties, CmsDialogState> {

    constructor(props: CmsDialogProperties) {
        super(props);

        const config: UiConfig = JSON.parse(props.ui.extension.config);

        this.state = {
            items: [],
            singleSelect: config.dataMode === 'single',
            apiKey: config.apiKey,
            height: config.height
        }

    }

    componentDidMount() {
        this.getInitialItems(this.props.ui).then(items => this.setState({items: items}));
    }

    async getInitialItems(ui: UiScope) {
        try {
            const options = await ui.dialog.options();
            let items = JSON.parse(options.value)
            return items;
        } catch (error: any) {
            console.error('Failed to register extension:', error.message);
            console.error('- error code:', error.code);
        }
        return [];
    }


    render() {
        const {items, singleSelect, apiKey, height} = this.state;
        return (
            <UiDialog height={height} key={items.length} items={items}
                      dataMode={singleSelect ? 'single' : 'multiple'}
                      apiKey={apiKey} onOk={items => {
                console.log('onOk', items)
                this.props.ui.dialog.close(items)
            }}/>);
    }
}


