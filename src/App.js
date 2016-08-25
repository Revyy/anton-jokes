import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './anton.jpg';
import './styles/App.css';
import { initJokeHooks, cancelJokeHooks, randomizeJoke } from './actions/jokeActions';
import { openAddDialog } from './actions/dialogActions';
import AddDialog from './components/AddDialog';

class App extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
    this.props.init();
  }

  componentDidUnMount() {
    this.props.cleanUp();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Anton Jokes!</h2>
        </div>
        <div className="App-main">
          <div className="Joke">
            <h2>{this.props.currentJoke.context}</h2>
            <p>{this.props.currentJoke.joke}</p>
          </div>
          <button onClick={this.props.randomizeJoke} className="Joke-button fab"><paper-ripple></paper-ripple>JOKE</button>
          <button onClick={this.props.openAddDialog} className="Add-button fab"><paper-ripple></paper-ripple>NEW</button>
        </div>
        <AddDialog />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentJoke: state.jokesReducer.currentJoke
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => dispatch(initJokeHooks()),
    cleanUp: () => dispatch(cancelJokeHooks()),
    randomizeJoke: () => dispatch(randomizeJoke()),
    openAddDialog: () => dispatch(openAddDialog())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
