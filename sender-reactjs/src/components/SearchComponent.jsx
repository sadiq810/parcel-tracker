import React from "react";
import {Input} from "rsuite";

function SearchComponent({setSearch}) {
    return (
        <div className="form-group">
            <Input placeholder={'Search...'} onChange={txt => setSearch(txt)}/>
        </div>
    )
}

export default SearchComponent;
