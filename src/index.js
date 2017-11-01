import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

/**
 * Reducer contador
 * @param _state
 * @param _action
 * @returns {*}
 * @private
 */
const _reducerNumber = ( _state = 2, _action )=>{
    var _newState = Object.assign( {}, _state );
    if ( _action.type === "AUM" ) {
        _newState = _state + 1;
        return _newState;
    }else if ( _action.type === "DEL" ) {
        _newState = _state - 1;
        return _newState;
    }
    return _state;
};

/**
 * Reducer task
 * @param _state
 * @param _action
 * @returns {*}
 * @private
 */
const _reducerTask = ( _state = [], _action )=>{
    var _newState = Object.assign( {}, _state );
    if ( _action.type === "ADD" ){
        _newState = _state.concat( [ {
            task: _action.task,
            id: _action.id
        } ] );
        return _newState;
    }
    return _state;
};

/**
 * Reducer id
 * @param _state
 * @param _action
 * @returns {*}
 * @private
 */
const _reducerId = ( _state = 1, _action )=>{
    var _newState = Object.assign( {}, _state );
    if ( _action.type === "ADD" ){
        _newState = _newState + 1;
        return _newState;
    }
    return _state;
};

/**
 * Obj JavaScript que toma los demas reducers como valores
 * @type {Reducer<any>}
 * @private
 */
const _reducer = combineReducers( {
    number: _reducerNumber,
    task: _reducerTask,
    id: _reducerId
} );

/**
 * State
 * @type {{count: number}}
 * @private
 */
/*const _state = {
    count: 2
};*/

/**
 * Store
 * @type {Store<{count: number}>}
 */
const _store = createStore( _reducer, applyMiddleware( ReduxThunk ) );

ReactDOM.render(
    // I. Implement provider
    <Provider store={ _store }>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
