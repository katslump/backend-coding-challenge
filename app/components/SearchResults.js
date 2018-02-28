import React from 'react';

let SearchResults = ({suggestions}) => {
    return (<ul className="list-group center">
        {suggestions}
    </ul>);

}
export default SearchResults;
