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
        jokes: state.jokes.delete(action.key)
      });

    default:
      return state;
  }
}