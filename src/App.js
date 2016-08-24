import React, { Component } from 'react';
import logo from './anton.jpg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      jokes: [],
      currJoke: {},
      inputContext: '',
      inputJoke: '',
      dialogOpen: false
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.addJoke = this.addJoke.bind(this);
    this.randomizeJoke = this.randomizeJoke.bind(this);
    this.inputContextChanged = this.inputContextChanged.bind(this);
    this.inputJokeChanged = this.inputJokeChanged.bind(this);
  }

  componentDidMount() {
    let ref = this;
    let fb = firebase.database().ref('jokes');
    fb.on('child_added', (snapshot) => {
      let jokes = ref.state.jokes;
      let val = snapshot.val();
      val.id = snapshot.key;
      jokes.push(val);
      ref.setState({
        jokes
      });
    });
    fb.on('child_removed', (snapshot) => {
      let jokeId = snapshot.key;
      for(let i = 0; i < ref.state.jokes.length; i++) {
        if (jokeId === ref.state.jokes[i].id) {
          ref.state.jokes.splice(i, 1);
        }
      }
    })
  }

  componentDidUnMount() {
    firebase.database.ref('jokes').off();
  }

  randomizeJoke() {
    const currJokeId = this.state.currJoke.id;
    let jokes = this.state.jokes.filter((joke) => {return joke.id !== currJokeId});
    let newJoke = jokes[Math.floor(Math.random()*jokes.length)]; 
    
    if (newJoke) {
      this.setState({
        currJoke: newJoke
      });
    }
  }

  openDialog() {
    this.setState({
      dialogOpen: true
    })
  }

  closeDialog(e) {
    e.preventDefault();
    let ref = this;
    setTimeout(() => {
      ref.setState({
        dialogOpen: false
      })
    }, 100)  
  }

  addJoke(e) {
    e.preventDefault();
    let ref = this;
    const context = this.state.inputContext;
    const joke = this.state.inputJoke;

    let doAdd = context !== '' && joke !== ''

    if (doAdd) {
      firebase.database().ref('jokes').push({context, joke})
      .then(() => {
        ref.setState({
          inputJoke: '',
          inputContext: ''
        });
      });
    }

  }

  inputContextChanged(e) {
    this.setState({
      inputContext: e.target.value
    })
  }

  inputJokeChanged(e) {
    this.setState({
      inputJoke: e.target.value
    })
  }


  showModal(open) {
    if (open) {
      return (
      <div className="Modal">
        <div className="Modal-header center">
          <h2>Add Joke!</h2>
        </div>
        <div className="Modal-main">
          <form className="Add-form">
            <div className="Input-group">
              <label htmlFor="context">Context</label>
              <input required onChange={this.inputContextChanged} value={this.state.inputContext} type="text" name="context" placeholder="What situation?" />
            </div>
            <div className="Input-group">
              <label htmlFor="joke">Joke</label>
              <input required onChange={this.inputJokeChanged} value={this.state.inputJoke} type="text" name="joke" />
            </div>
            <div className="Button-group">
              <button onClick={this.closeDialog} className="flat"><paper-ripple></paper-ripple>Cancel</button>
              <button onClick={this.addJoke} className="flat"><paper-ripple></paper-ripple>Add</button>
            </div>
        </form>
        </div>
      </div>
      )
    } else {
      return null;
    }
    
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
            <h2>{this.state.currJoke.context}</h2>
            <p>{this.state.currJoke.joke}</p>
          </div>
          <button disabled={this.state.jokes.length === 0 ? true : false} onClick={this.randomizeJoke} className="Joke-button fab"><paper-ripple></paper-ripple>JOKE</button>
          <button onClick={this.openDialog} className="Add-button fab"><paper-ripple></paper-ripple>NEW</button>
        </div>
        {this.showModal(this.state.dialogOpen)}
      </div>
    );
  }
}

export default App;
