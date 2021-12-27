import React from "react";

function InputComponent({title, value, id, setValue, placeholder}) {
    return (
        <div className="mb-3">
            <label htmlFor={id}>{title}</label>
            <input type="text" className="form-control" id={id} value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} required/>
        </div>
    )
}

export default InputComponent;
