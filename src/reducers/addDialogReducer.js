import { INIT_ADD_DIALOG_STATE } from '../constants/states';
import { DIALOG_ACTIONS } from '../actions/dialogActions';

export default function addDialogReducer(state = INIT_ADD_DIALOG_STATE, action) {

  switch(action.type) {

    case DIALOG_ACTIONS.OPEN_ADD_DIALOG:
      return Object.assign({}, state, {
        addDialogOpen: true
      });
    case DIALOG_ACTIONS.CLOSE_ADD_DIALOG:
      return Object.assign({}, state, {
        addDialogOpen: false
      });
    case DIALOG_ACTIONS.UPDATE_ADD_FORM_CONTEXT:
      return Object.assign({}, state, {
        form_context: action.value
      });
    case DIALOG_ACTIONS.UPDATE_ADD_FORM_JOKE:
      return Object.assign({}, state, {
        form_joke: action.value
      });


    default:
      return state;
  }
}