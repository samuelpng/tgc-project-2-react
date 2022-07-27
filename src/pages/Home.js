import React from 'react'
import '../App.css'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import logo from '../pictures/sgbirds-logo.png';
import landingImg from '../pictures/landingImg.jpg';
import parrot from '../pictures/parrot.png';
import eagle from '../pictures/eagle.png';
import landingLogo from '../pictures/landing-logo.png';
import gardensBay from '../pictures/gardensBay.jpg';
import hornbill from '../pictures/hornbill.png';
import landingVideo from '../pictures/landingVideo.mp4'
import Modal from 'react-bootstrap/Modal';

// import "bootstrap/dist/css/bootstrap.min.css"

export default class Home extends React.Component {
  // url = "https://8000-samuelpng-tgc18project2-vk174li0pel.ws-us54.gitpod.io/";
  url = "https://sgbirds.herokuapp.com/"



  // async componentDidMount() {
  //   let response = await axios.get(this.url + 'bird_sightings')
  //   this.setState({
  //     data: response.data
  //   })
  // }


  render() {
    return (
      <React.Fragment>

        {/* <div className="desktopPadding"></div> */}
        <div className="landingPage">

          <img src={gardensBay} style={{ height: "100vh", width: "100vw", backgroundImage: "cover", objectFit: "fit" }} />
   
        </div>

        <div className="container-fluid" style={{ height: "80vh" }}>
          <div className="landingPadding" style={{height: "30px"}}></div>
          <div className="row">
            
            <div className="col-lg-12 landingIcon pt-3" style={{ color: '#642d3c' }}>
              <img src={landingLogo} style={{ height: "50%" }} />
            </div>
 
            <div className="col-lg-12 landingIcon pt-2" style={{ color: '#fff2dd', textShadow: "2px 2px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",}}>
              <h1 className="landingText">Welcome to SG Birds</h1>
            </div>
            <div className="col-lg-12 landingIcon pt-2" style={{ color: '#642d3c'}}>
              <button onClick={this.props.explore} className="btn btn-primary landingBtn" style={{width:"60vw", height:"50px", fontSize:"20px", fontWeight:"600", boxShadow:"0px 2px 5px 4px"}}>Explore</button>
            </div>
            <div className="col-lg-12 landingIcon pt-2" style={{ color: '#642d3c'}}>
              <button onClick={this.props.add} className="btn btn-primary landingBtn" style={{width:"60vw", height:"50px", fontSize:"20px", fontWeight:"600", boxShadow:"0px 2px 5px 4px"}}>New Sighting</button>
            </div>
            <div className="col-lg-12 landingIcon pt-2" style={{ color: '#642d3c' }}>
              <button onClick={this.props.map} className="btn btn-primary landingBtn" style={{width:"60vw", height:"50px", fontSize:"20px", fontWeight:"600", boxShadow:"0px 2px 5px 4px"}}>Map</button>
            </div>
            {/* <div className="col-lg-12 landingIcon pt-2" style={{ color: '#642d3c' }}>
              <button onClick={this.props.profile} className="btn btn-primary landingBtn" style={{width:"60vw", height:"50px", fontSize:"20px", fontWeight:"600", boxShadow:"0px 2px 5px 4px"}}>Profile</button>
            </div> */}

          </div>
        </div>


      </React.Fragment>)
  }
}