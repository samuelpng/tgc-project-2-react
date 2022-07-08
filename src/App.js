import React from 'react'
import './App.css';
import { BiSearchAlt, BiPlusCircle, BiMap } from "react-icons/bi";
import { IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import logo from './pictures/sgbirds-logo.png';

// import NavBar from './pages/NavBar';

export default class App extends React.Component {

  state = {
    home: false,
    explore: false,
    add: false,
    map: false,
    profile: false
  }

  homeIcon = () => {
    this.setState({
      home: false, explore: false, add: false, map: false, profile: false
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

  render() {
    return (
      <React.Fragment>
        <body>
        <div className="header">
          <img src={logo} alt="logo" height="90px"/>
        </div>



        <div className="container">
          <div className="navigation">
            <ul>
              <li onClick={this.homeIcon}>
                <div className="icon-container">
                  <span className="icon"><IoHomeOutline /></span>
                  <span className="text">Home</span>
                </div>
              </li>
              <li onClick={this.exploreIcon}>
                <div className="icon-container">
                  <span className="icon"><BiSearchAlt /></span>
                  <span className="text">Explore</span>
                </div>
              </li>
              <li onClick={this.addIcon}>
                <div className="icon-container">
                  <span className="icon"><BiPlusCircle /></span>
                  <span className="text">Add</span>
                </div>
              </li>
              <li onClick={this.mapIcon}>
                <div className="icon-container">
                  <span className="icon"><BiMap /></span>
                  <span className="text">Map</span>
                </div>
              </li>
              <li onClick={this.profileIcon}>
                <div className="icon-container">
                  <span className="icon"><IoPersonOutline /></span>
                  <span className="text">Profile</span>
                </div>
              </li>
              {/* {this.state.indicator ? <div className="indicator"></div> : <div></div>} */}
            </ul>
          </div>
        </div>
        </body>
      </React.Fragment>
    )
  }
}

