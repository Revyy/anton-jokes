import React from 'react';
import {connect} from 'react-redux';
import { closeAddDialog, updateContext, updateJoke, addJoke } from '../actions/dialogActions';
import '../styles/AddDialog.css';

class AddDialog extends React.Component {


  render() {
    if (this.props.open) {
      return (
        <div className="Modal">
          <div className="Modal-header center">
            <h2>Add Joke!</h2>
          </div>
          <div className="Modal-main">
            <form className="Add-form">
              <div className="Input-group">
                <label htmlFor="context">Context</label>
                <input required onChange={this.props.updateContext} value={this.props.context} type="text" name="context" placeholder="What situation?" />
              </div>
              <div className="Input-group">
                <label htmlFor="joke">Joke</label>
                <input required onChange={this.props.updateJoke} value={this.props.joke} type="text" name="joke" />
              </div>
              <div className="Button-group">
                <button onClick={this.props.closeAddDialog} className="flat"><paper-ripple></paper-ripple>Cancel</button>
                <button onClick={this.props.addJoke} className="flat"><paper-ripple></paper-ripple>Add</button>
              </div>
            </form>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

}

const mapStateToProps = (state) => {
  return {
    open: state.addDialogReducer.addDialogOpen,
    context: state.addDialogReducer.form_context,
    title: state.addDialogReducer.form_title
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeAddDialog: () => dispatch(closeAddDialog()),
    updateContext: (e) => dispatch(updateContext(e.target.value)),
    updateJoke: (e) => dispatch(updateJoke(e.target.value)),
    addJoke: (e) => {
      e.preventDefault();
      dispatch(addJoke());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDialog);
