import React from 'react';
import ReactDOM from 'react-dom';
import InputLine from './InputLine';
import SearchResults from './SearchResults';

ReactDOM.render(<InputLine/> <div className = "row" > <div className="col-xs-12 col-md-4">
        <h4>NPM Algorithm</h4>
        <SearchResults/>
    </div>
    <div className="col-xs-12 col-md-4">
        <h4>My Algorithm</h4>
        <SearchResults/>
    </div>
</div>,document.getElementById('root'));

}

export default App;
