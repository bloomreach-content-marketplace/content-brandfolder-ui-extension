import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import UiDialog from "./UiDialog";
import {itemData} from "./utils";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UiField from "./UiField";
import UiExtension, {UiScope} from "@bloomreach/ui-extension";
import CmsField from "./CmsField";
import CmsDialog from "./CmsDialog";

async function render() {

    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );

    try {
        const ui: UiScope = await UiExtension.register();

        const routing = (
            <BrowserRouter>
                <Routes>
                    <Route path="/dialog" element={<CmsDialog ui={ui}/>}/>
                    <Route path="/" element={<CmsField ui={ui}/>}/>
                </Routes>
            </BrowserRouter>
        );

        root.render(routing)

    } catch (error: any) {
        console.log(error);
        console.error('Failed to register extension:', error.message);
        console.error('- error code:', error.code);

        const routing = (
            <BrowserRouter>
                <Routes>
                    <Route path="/dialog" element={<UiDialog onOk={items => console.log('onOk', items)}
                                                             apiKey={'123'}
                                                             dataMode={'multiple'} items={itemData}/>}/>
                    <Route  path="/"
                           element={<UiField items={itemData} onChange={items => console.log('onChange', items)}
                                             dataMode={'multiple'} editMode={true}
                                             onOpenDialog={() => window.open("/dialog")}/>}/>
                </Routes>
            </BrowserRouter>
        );

        root.render(routing)

    }
}

render();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
