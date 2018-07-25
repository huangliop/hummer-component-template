import React from 'react';
import Demo from '../src/index';
import ReactDOM from 'react-dom';

it('Test index.js  ', () => {
  
    const div = document.createElement('div');
    ReactDOM.render(<Demo demoString={`Run test`}/>, div);
    expect(div.textContent).toBe('Run test')
    ReactDOM.unmountComponentAtNode(div);
})
