import React from "react";
import {SelectPicker} from "rsuite";

const filters = [{ "label": "By Picked Up", "value": "picked"},
    {"label": "By Available", "value": "available"},
    {"label": "By Delivered", "value": "delivered"}];

function FilterComponent({setFilter}) {
    return (
        <div className="form-group">
            <label htmlFor="exampleInputEmail1" className={'font-weight-bold'}>Filter: &nbsp;</label>
            <SelectPicker data={filters} searchable={false} style={{ width: 224 }} onChange={e => setFilter(e)}/>
        </div>
    )
}

export default FilterComponent;
