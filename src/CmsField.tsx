import React from "react";
import {BfObject, UiConfig} from "./utils";
import {DialogProperties, DialogSize, UiScope} from "@bloomreach/ui-extension";
import UiField from "./UiField";

interface CmsFieldState {
    items: Array<BfObject>
    editMode: boolean
    singleSelect: boolean
    apiKey: string
}

interface CmsFieldProperties {
    ui: UiScope
}

export default class CmsField extends React.Component<CmsFieldProperties, CmsFieldState> {

    constructor(props: CmsFieldProperties) {
        super(props);

        const config: UiConfig = JSON.parse(props.ui.extension.config);
        console.log('config', config)

        this.state = {
            items: [],
            editMode: false,
            singleSelect: config.dataMode === 'single',
            apiKey: config.apiKey
        }
    }

    componentDidMount() {
        this.getInitialItems(this.props.ui).then(items => this.setState({items: items}));
    }

    async getInitialItems(ui: UiScope) {
        try {
            const brDocument = await ui.document.get();
            this.setState({editMode: brDocument.mode === 'edit'});

            let store = await ui.document.field.getValue();
            let items: Array<BfObject> = [];
            if (store) {
                console.log('store exists', store)
                const parsedStore = JSON.parse(store);
                console.log('store parsed', parsedStore)
                items = Array.isArray(items) ? parsedStore : [];
                console.log('items', items)
            }

            return items;
        } catch (error: any) {
            console.error('Failed to register extension:', error.message);
            console.error('- error code:', error.code);
        }
        return [];
    }

    async openDialog(ui: UiScope) {
        try {

            const dialogOptions: DialogProperties = {
                title: 'Brandfolder picker',
                url: './dialog',
                size: DialogSize.Large,
                value: JSON.stringify(this.state.items)
            };

            const response = await ui.dialog.open(dialogOptions) as unknown as Array<BfObject>;
            this.setState({items: response});
            await ui.document.field.setValue(JSON.stringify(response));
        } catch (error: any) {
            if (error.code === 'DialogCanceled') {
                return;
            }
            console.error('Error after open dialog: ', error.code, error.message);
        }

    }


    render() {
        const {items, singleSelect, editMode} = this.state;
        return (
            <UiField
                key={`${(items && items.length > 0) ? items.map(value => value.id).join('-') : Math.floor(Math.random() * 100)}`}
                items={items}
                onChange={(items) => this.setState({items: items}, () => this.props.ui.document.field.setValue(JSON.stringify(items)))}
                dataMode={singleSelect ? 'single' : 'multiple'} editMode={editMode}
                onOpenDialog={() => this.openDialog(this.props.ui)}/>);
    }
}


