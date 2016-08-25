export const JOKE_ACTIONS = {
    ADD_JOKE: 'ADD_JOKE',
    REMOVE_JOKE: 'REMOVE_JOKE',
    RANDOMIZE_JOKE: 'RANDOMIZE_JOKE'
}

export function initJokeHooks() {
  return (dispatch) => {

    let fb = firebase.database().ref('jokes');
    fb.on('child_added', (snapshot) => {
      let joke = snapshot.val();
      joke.weight = 1;
      joke.key = snapshot.key;
      dispatch({type: JOKE_ACTIONS.ADD_JOKE, key: snapshot.key, joke});  
    });

    fb.on('child_removed', (snapshot) => {
      dispatch({type: JOKE_ACTIONS.REMOVE_JOKE, key: snapshot.key});    
    })
  }
}

export function cancelJokeHooks() {
  firebase.database.ref('jokes').off();
}

export function randomizeJoke() {
  return {type: JOKE_ACTIONS.RANDOMIZE_JOKE};
};