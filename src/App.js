import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
    addTask = ( e )=>{
        if ( e.which === 13 ){
            this.props.agregar( e.target.value, this.props.id );
        }
    };
  render() {
      const taskElements = this.props.task.map( ( task )=>{
          return <h2 key={ task.id }> { task.task } </h2>
      } );
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
            { this.props.data }
            <br/>
            <button onClick={ this.props.aumentar }>Aumentar</button>
            <button onClick={ this.props.disminuir }>Disminuir</button>
            <br/>
            <input type="text" onKeyPress={ this.addTask.bind( this ) }/>
            <br/>
            { taskElements }
          To get started, edit <code>src/App.js</code> and save to reload.
        </div>
      </div>
    );
  }
}

/**
 * Internamente hace una suscripción y un get STATE, por lo que si hay un cambio en el state, se ejecuta
 * nuevamente, tanto el STATE como el DISPATCH entra como props a el componente
 * @param _state
 * @returns {{data: number}}
 * @private
 */
const _mapStateToProps = ( _state )=>{
    return {
        data: _state.number,
        task: _state.task,
        id: _state.id
    }
};

/**
 * Obj que asume q las funciones internas son ACTION CREATOR y al ingresarlas al componente las engloba en
 * DISPATCH para que puedan ser llamadas. FORMA I
 * @type {{aumentar: (function()), disminuir: (function())}}
 * @private
 */
/*const _mapDispatchToProps = {
  aumentar: ()=>{
    return {
        type: "AUM"
    };
  },
  disminuir: ()=>{
      return {
          type: "DIS"
      }
  }
};*/

/**
 * Obj que asume q las funciones internas son ACTION CREATOR y al ingresarlas al componente las engloba en
 * DISPATCH para que puedan ser llamadas. FORMA II
 * @param _dispatch
 * @returns {{aumentar: (function()), disminuir: (function())}}
 * @private
 */
const _mapDispatchToProps = ( _dispatch )=>{
    return{
        aumentar: ()=>{
            _dispatch( {
                type: "AUM"
            } );
        },
        disminuir: ()=>{
            _dispatch( {
                type: "DEL"
            } );
        },
        agregar: ( task, id )=>{
            _dispatch( {
                type: "ADD",
                task,
                id
            } );
        }
    }
};

// connect permite acceder al STATE y hacer DISPATCH de acciones para redux
export default  connect( _mapStateToProps, _mapDispatchToProps)(App);
