import { INIT_JOKES_STATE } from '../constants/states';
import { JOKE_ACTIONS } from '../actions/jokeActions';

export default function jokesReducer(state = INIT_JOKES_STATE, action) {

  switch(action.type) {

    case JOKE_ACTIONS.ADD_JOKE:
      return Object.assign({}, state, {
        jokes: state.jokes.set(action.key, action.joke)
      });

    case JOKE_ACTIONS.REMOVE_JOKE:
      return Object.assign({}, state, {
        jokes: state.jokes.delete(action.key),
        recent: state.recent.delete(action.key)
      });

    case JOKE_ACTIONS.RANDOMIZE_JOKE:
      let size = state.jokes.size;
      let rnd = Math.floor(Math.random() * size);
      let joke, i = 0;  
      for (let j of state.jokes.values()) {
        if (rnd === i) {
          joke = j;
          break;
        } else {
          i++;
        }
      }

      if (size === 1) {
        return Object.assign({}, state,{
          currentJoke: joke,
          recent: state.jokes.delete(joke.key),
          jokes: state.recent.set(joke.key, joke)
        });
      } else {
        return Object.assign({}, state,{
          currentJoke: joke,
          recent: state.recent.set(joke.key, joke),
          jokes: state.jokes.delete(joke.key)
        });
      }

    default:
      return state;
  }
}