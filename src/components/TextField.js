import React from 'react';

// This is a presentational component. It doesn't manage state, and instead, is used
// for simply rendering something to the page.
const TextField = props => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        type='text'
        value={props.content}
        onChange={props.handlerFunction}
      />
    </label>
  );
}

export default TextField;
