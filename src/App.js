import React from 'react';

import { Switch, Route, withRouter } from "react-router-dom"

import AppLayout from './components/AppLayout/AppLayout';
import Watch from './containers/Watch/Watch';
import { bindActionCreators } from 'redux';
import { youtubeLibraryLoaded } from "./store/actions/api"
import { connect } from 'react-redux';

import Home from './containers/Home/Home';
import Search from './containers/Search/Search';



const API_KEY = process.env.REACT_APP_API_KEY;


export class App extends React.Component {

  componentDidMount() {
    this.loadYoutubeApi();
  }


  loadYoutubeApi = () => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";


    script.onload = () => {
      window.gapi.load('client', () => {
        window.gapi.client.setApiKey(API_KEY);
        window.gapi.client.load('youtube', 'v3', () => {
          this.props.youtubeLibraryLoaded();
        });
      });
    };


    document.body.appendChild(script);


  }
  render() {



    return (
      <React.Fragment>

        <AppLayout >

          <Switch>
           
            <Route path="/results" render={() => <Search key={this.props.location.key}/>}/>
            <Route path="/watch" render={() => <Watch key={this.props.location.key} />} />
            <Route exact path="/" component={Home} />

          </Switch>

        </AppLayout>
      </React.Fragment>

    );

  }
}



const mapDispatchtoProps = (dispatch) => {

  return bindActionCreators({ youtubeLibraryLoaded }, dispatch)
}

export default withRouter(connect(null, mapDispatchtoProps)(App));
