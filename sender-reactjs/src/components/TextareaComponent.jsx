import React from "react";

function TextareaComponent({id, title, placeholder, value, setValue}) {
    return (
        <div className="mb-3">
            <label htmlFor={id} dangerouslySetInnerHTML={{__html: title}}></label>
            <textarea className="form-control" id={id} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)}></textarea>
        </div>
    );
}

export default TextareaComponent;
