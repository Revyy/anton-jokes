export const DIALOG_ACTIONS = {
  OPEN_ADD_DIALOG: 'OPEN_ADD_DIALOG',
  CLOSE_ADD_DIALOG: 'CLOSE_ADD_DIALOG',
  UPDATE_ADD_FORM_CONTEXT: 'UPDATE_ADD_FORM_CONTEXT',
  UPDATE_ADD_FORM_JOKE: 'UPDATE_ADD_FORM_TITLE',
};

export function openAddDialog() {
  return {type: DIALOG_ACTIONS.OPEN_ADD_DIALOG};
};

export function closeAddDialog() {
  return {type: DIALOG_ACTIONS.CLOSE_ADD_DIALOG};
};

export function updateContext(value) {
  return {type: DIALOG_ACTIONS.UPDATE_ADD_FORM_CONTEXT, value}
}

export function updateJoke(value) {
  return {type: DIALOG_ACTIONS.UPDATE_ADD_FORM_JOKE, value}
}

export function resetForm() {
  return (dispatch) => {
    dispatch(updateContext(''));
    dispatch(updateJoke(''));
  }
}

export function addJoke() {
  return (dispatch, getState) => {
    let context = getState().addDialogReducer.form_context;
    let joke = getState().addDialogReducer.form_joke;
    firebase.database().ref('jokes').push({context, joke})
    .then(() => {
      dispatch(resetForm()); 
    });
  }
}