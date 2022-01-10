import React, { useState } from "react";

const AutoComplete = ({ suggestions }) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");

    const onChange = (evt) => {
        const userInput = evt.target.value;

        // Filter our suggestions that don't contain the user's input
        const unLinked = suggestions.filter(
            (suggestion) =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setInput(evt.target.value);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };


    const onClick = (evt) => {
        setFilteredSuggestions([]);
        setInput(evt.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };
    const onKeyDown = (evt) => {
        // setFilteredSuggestions([]);
        if (evt.keyCode === 13) {
            setInput(evt.target.innerText);
            // return filteredSuggestions;
        } else if (evt.keyCode === 38) {
            console.log(evt);
            if (activeSuggestionIndex === 0) {
                setShowSuggestions(false);
            }
        } else if (evt.keyCode === 40) {
            console.log(evt);
            // filteredSuggestions;
            // setShowSuggestions(false);

            if (activeSuggestionIndex === 0) {

                // setActiveSuggestionIndex(evt.target.index);
                console.log(evt.target.innerText);
            }
        } else if (evt.keyCode === 40) {
            console.log(evt);
            // filteredSuggestions;
            // setShowSuggestions(false);

            if (activeSuggestionIndex === 0) {

                // setActiveSuggestionIndex(evt.target.index);
                console.log(evt.target.innerText);
            }
            // else if () {

            // }
        }


        // setShowSuggestions(false);
    };

    const SuggestionsListComponent = () => {
        return filteredSuggestions.length ? (
            <ul className="suggestions">
                {filteredSuggestions.map((suggestion, index) => {
                    let className;
                    // Flag the active suggestion with a class
                    if (index === activeSuggestionIndex) {
                        className = "suggestion-active";
                    }
                    return (
                        <li className={className} key={suggestion} onClick={onClick}>
                            {suggestion}
                        </li>
                    );
                })}
            </ul>
        ) : (
            <div class="no-suggestions">
                <em>No suggestions, you're on your own!</em>
            </div>
        );
    };

    return (
        <div>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={input}
            />
            {showSuggestions && input && <SuggestionsListComponent />}
        </div>
    );
};
export default AutoComplete;;