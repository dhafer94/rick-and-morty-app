import { useEffect, useState } from "react";

function getSavedVal(key, initVal) {
    //after retrieving the information parsing then run check
    const savedVal = JSON.parse(localStorage.getItem(key));
    if (savedVal) { return savedVal; };

    if (initVal instanceof Function) { return initVal(); };
    return initVal;
}

export default function useLocalStorage(key, initVal) {
    //exporting as useState
    const [val, SetVal] = useState(() => {
        return getSavedVal(key, initVal);
    });
    const stringVal = JSON.stringify(val);
    useEffect(() => {
        localStorage.setItem(key, stringVal);
    }, [val]);

    return [val, SetVal];
}