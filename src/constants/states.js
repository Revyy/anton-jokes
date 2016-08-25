const Immutable = require('immutable');


export const INIT_JOKES_STATE = {
  jokes: Immutable.Map(),
  recent: Immutable.Map(),
  currentJoke: {}
}

export const INIT_ADD_DIALOG_STATE = {
  addDialogOpen: false,
  form_context: '',
  form_joke: ''
}