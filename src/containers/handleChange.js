import React, { useState } from 'react';
//the name method
const [cName, SetCName] = useState([]);

export const handleChange = (evt) => {

    if (evt.type === 'click') {
        if (evt.target.textContent) {
            SetCName(evt.target.textContent);
            // setRoute('profile');
            // console.log(evt);
            console.log(evt.target.id);
        }
    } else if (evt.type === 'keydown' && evt.keyCode === 13) {
        // console.log(evt);
        evt.target.addEventListener('keyup', (evt) => {
            if (evt.type === 'keyup' && evt.keyCode === 13) {
                SetCName(evt.target.value);
                // setRoute('profile');
                // console.log(evt.target.value);
                // console.log(evt);
                console.log(evt.target.id);
            }
        });
    }
};