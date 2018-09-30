import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App style = {{height: "100%", width: "100%"}}/>, document.getElementById('root'));
registerServiceWorker();
