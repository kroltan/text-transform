import React from 'react';
import {BehaviorSubject} from "rxjs";
import {componentFromStream, compose, setDisplayName} from "recompose";

import TransformMode from "./TransformMode";
import './App.css';


export default compose(
    setDisplayName("App"),
    componentFromStream,
)(props$ => {
    const text$ = new BehaviorSubject("");
    const transform$ = new BehaviorSubject(x => x);

    return props$.combineLatest(
        text$,
        transform$,
        ({modes}, text, currentTransform) => {
            const result = currentTransform(text);

            return <div className="App">
                <header className={result === "" ? "empty" : ""} tabIndex={0}>
                    {result}
                </header>
                <input
                    autoFocus={true}
                    type="text"
                    placeholder="Type here..."
                    value={text}
                    onChange={ev => text$.next(ev.target.value)}
                />
                <nav>
                    {modes.map(({transform, name}) => <TransformMode
                        key={transform}
                        transform={transform}
                        selected={currentTransform}
                        select={transform$.next.bind(transform$)}
                        name={name}
                    />)}
                </nav>
                <footer>
                    Made by <a href="//kroltan.github.io">kroltan</a>
                </footer>
            </div>;
        },
    );
});
