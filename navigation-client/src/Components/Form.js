import React, { useState, useEffect } from 'react';

function Form(props) {

    return (
        <>
            <form>
                <label>
                    <div>
                    <input type="text" name="title" value={props.link.title}></input>
                    </div>
                    <div>
                    <input type="text" name="url" value={props.link.url}></input>
                    </div>
                </label>
               
            </form>
        </>
    );
}

export default Form;