import * as React from 'react';

const App = ({ name, ...rest }) => {
    return (
        <button type="button" className="button" {...rest}> {name} </button>
    );
};

export default App;