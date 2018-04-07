import React from "react";
import ReactDOM from "react-dom";
import {setObservableConfig} from "recompose";
import rxjsConfig from "recompose/rxjsObservableConfig";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import emojify from "./transforms/emojify";

setObservableConfig(rxjsConfig);

ReactDOM.render(<App
    modes={[
        {
            name: "Identity",
            transform: x => x,
        },
        {
            name: "Lowercase",
            transform: x => x
                .toLocaleLowerCase(),
        },
        {
            name: "Uppercase",
            transform: x => x
                .toLocaleUpperCase(),
        },
        {
            name: "Buzzfeed",
            transform: x => x
                .replace(/(?:^|\s)[a-zA-Z]/g, c => c.toLocaleUpperCase()),
        },
        {
            name: "Wokny",
            transform: x => x
                .split("")
                .map(c => Math.random() > 0.5
                    ? c.toLocaleUpperCase() :
                    c.toLocaleLowerCase()
                )
                .join(""),
        },
        {
            name: "Discord Emoji",
            transform: emojify,
        },
        {
            name: "Snythwave",
            transform: x => x
                .replace(/(.)/g, " $1 ")
                .trim(),
        },
        {
            name: "Full-width",
            transform: x => x
                .replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + 0xFEE0)),
        },
        {
            name: "Strike",
            transform: x => x
                .replace(/(.)/g, "\u0336$1"),
        },
    ]}
/>, document.getElementById('root'));

registerServiceWorker();
