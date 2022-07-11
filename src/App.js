import React from 'react'
import './App.css';
import { BiSearchAlt, BiPlusCircle, BiMap } from "react-icons/bi";
import { IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import Home from './pages/Home';
import "bootstrap/dist/css/bootstrap.min.css"
import Add from './pages/Add';
// import NavBar from './pages/NavBar';

export default class App extends React.Component {

  state = {
    home: true,
    explore: false,
    add: false,
    map: false,
    profile: false
  }

  homeIcon = () => {
    this.setState({
      home: true, explore: false, add: false, map: false, profile: false
    })
  }

  exploreIcon = () => {
    this.setState({
      home: false, explore: true, add: false, map: false, profile: false
    })
  }

  addIcon = () => {
    this.setState({
      home: false, explore: false, add: true, map: false, profile: false
    })
  }

  mapIcon = () => {
    this.setState({
      home: false, explore: false, add: false, map: true, profile: false
    })
  }

  profileIcon = () => {
    this.setState({
      home: false, explore: false, add: false, map: false, profile: true
    })
  }

  pageToRender = () => {
    if (this.state.home) {
      return (<Home />)
    } else if (this.state.explore) {
      return (<h1>explore</h1>)
    } else if (this.state.add) {
      return (<Add />)
    } else if (this.state.map) {
      return (<h1>Map</h1>)
    } else {
      return (<h1>Profile</h1>)
    }
  }

  render() {
    return (
      <React.Fragment>
        <body>
          <div className="main">
            {this.pageToRender()}
          </div>

        
            <div className="navigation">
              <ul>
                <li onClick={this.homeIcon}>
                  <div className="icon-container">
                    <span className={this.state.home ? "iconActive" : "iconInactive"}><IoHomeOutline /></span>
                    <span className={this.state.home ? "textActive" : "textInactive"}>Home</span>
                  </div>
                </li>
                <li onClick={this.exploreIcon}>
                  <div className="icon-container">
                    <span className={this.state.explore ? "iconActive" : "iconInactive"}><BiSearchAlt /></span>
                    <span className={this.state.explore ? "textActive" : "textInactive"}>Explore</span>
                  </div>
                </li>
                <li onClick={this.addIcon}>
                  <div className="icon-container">
                    <span className={this.state.add ? "iconActive" : "iconInactive"}><BiPlusCircle /></span>
                    <span className={this.state.add ? "textActive" : "textInactive"}>Add</span>
                  </div>
                </li>
                <li onClick={this.mapIcon}>
                  <div className="icon-container">
                    <span className={this.state.map ? "iconActive" : "iconInactive"}><BiMap /></span>
                    <span className={this.state.map ? "textActive" : "textInactive"}>Map</span>
                  </div>
                </li>
                <li onClick={this.profileIcon}>
                  <div className="icon-container">
                    <span className={this.state.profile ? "iconActive" : "iconInactive"}><IoPersonOutline /></span>
                    <span className={this.state.profile ? "textActive" : "textInactive"}>Profile</span>
                  </div>
                </li>
              </ul>
            </div>
        </body>
      </React.Fragment>
    )
  }
}


