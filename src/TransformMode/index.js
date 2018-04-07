import React from "react";
import {componentFromStream, compose, setDisplayName} from "recompose";

import "./style.css";


export default compose(
    setDisplayName("TransformMode"),
    componentFromStream,
)(props$ => props$.map(({
    transform,
    selected,
    select,
    name,
}) => <label className="TransformMode">
    <input
        type="radio"
        checked={selected === transform}
        onChange={() => {
            return select(transform);
        }}
    />
    {name}
</label>));