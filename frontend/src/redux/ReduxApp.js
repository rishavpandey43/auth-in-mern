import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actionCreators from "./actions/actionCreators";

import App from "../App";

const mapStateToProps = state => ({
  basicAuthDetail: state.basicAuthDetail,
  cookieAuthDetail: state.cookieAuthDetail,
  sessionAuthDetail: state.sessionAuthDetail,
  tokenAuthDetail: state.tokenAuthDetail,
  userDetail: state.userDetail
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

const ReduxApp = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default ReduxApp;
