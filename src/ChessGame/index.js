import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import TspChess from './Components/TspChess';

document.title = "React Chess";
ReactDOM.render(<TspChess />, document.getElementById('root'));
