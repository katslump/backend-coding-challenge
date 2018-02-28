import React from 'react';
import axios from 'axios';

let InputLine = () => {
let input;

  let handleSubmit = (e) => {
    e.preventDefault();
    if(input.value.length > 0) {
        axios.get('/suggestions', {
         term: input.value
       }).then(function(response) {
         console.log("got the suggestions: " + response);
       }).catch(function(error) {
         console.log(error);
       });
      input.value = '';
    }
  }

    return (
    <form onSubmit={handleSubmit}>
      <div className="input-container form-group">
        <input type="text" id="input-term" className="search-input" placeholder={'Search for a city...'} ref={ text => input = text}/>
      </div>
    </form>
  )

}

export default InputLine;
