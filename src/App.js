import React from 'react'
import './App.css';
import { BiSearchAlt, BiPlusCircle, BiMap } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import {AiOutlineHome} from "react-icons/ai"
import Home from './pages/Home';
import "bootstrap/dist/css/bootstrap.min.css"
import Add from './pages/Add';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Map from './pages/Map';
import logo from './pictures/sgbirds-logo.png';
import { Nav, Navbar, Container } from 'react-bootstrap';



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
      home: true, explore: false, add: false, map: false, profile: false, update: false
    })
  }

  exploreIcon = () => {
    this.setState({
      home: false, explore: true, add: false, map: false, profile: false, update: false
    })
  }

  addIcon = () => {
    this.setState({
      home: false, explore: false, add: true, map: false, profile: false, update: false
    })
  }

  mapIcon = () => {
    this.setState({
      home: false, explore: false, add: false, map: true, profile: false, update: false
    })
  }

  profileIcon = () => {
    this.setState({
      home: false, explore: false, add: false, map: false, profile: true, update: false
    })
  }

  updateSighting = () => {
    this.setState({
      home: false, explore: false, add: false, map: false, profile: false, update: true
    })
  }

  pageToRender = () => {
    if (this.state.home) {
      return (<Home explore={this.exploreIcon} add={this.addIcon} map={this.mapIcon}/>)
    } else if (this.state.explore) {
      return (<Explore />)
    } else if (this.state.add) {
      return (<Add />)
    } else if (this.state.map) {
      return (<h1><Map /></h1>)
    } else if (this.state.profile) {
      return (<Profile />)
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="main">
          <div>
            {this.pageToRender()}
          </div>


          <div className="navigation">
            <ul>
              <li onClick={this.homeIcon}>
                <div className="icon-container">
                  <span className={this.state.home ? "iconActive" : "iconInactive"}><AiOutlineHome /></span>
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
        </div>

        <div className="desktopNavbar">
          <Navbar fixed="top">
            <Container className="text-center">
              <Navbar.Brand onClick={this.homeIcon}><img src={logo} alt="logo" height="60px" /></Navbar.Brand>
              <Nav className="ms-auto">
                <Nav.Link onClick={this.homeIcon} className={this.state.home ? "pageActive" : ""} style={{width: "75px"}}>Home</Nav.Link>
                <Nav.Link onClick={this.exploreIcon} className={this.state.explore ? "pageActive" : ""} style={{width: "75px"}}>Explore</Nav.Link>
                <Nav.Link onClick={this.addIcon} className={this.state.add ? "pageActive" : ""} style={{width: "75px"}}>Add</Nav.Link>
                <Nav.Link onClick={this.mapIcon} className={this.state.map ? "pageActive" : ""} style={{width: "75px"}}>Map</Nav.Link>
                <Nav.Link onClick={this.profileIcon} className={this.state.profile ? "pageActive" : ""} style={{width: "75px"}}>Profile</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>
      </React.Fragment>
    )
  }
}


