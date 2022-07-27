import React from 'react'
import '../App.css'


import landingLogo from '../pictures/landing-logo.png';
import gardensBay from '../pictures/gardensBay.jpg';




export default function Home(props) {



    return (
      <React.Fragment>

        <div className="landingPage">

          <img src={gardensBay} style={{ height: "100vh", width: "100vw", backgroundImage: "cover", objectFit: "cover" }} />
   
        </div>

        <div className="container-fluid" style={{ height: "80vh" }}>
          <div className="landingPadding" style={{height: "30px"}}></div>
          <div className="row">
            
            <div className="col-lg-12 landingIcon pt-3" style={{ color: '#642d3c' }}>
              <img src={landingLogo} style={{ height: "50%" }} />
            </div>
 
            <div className="col-lg-12 landingIcon pt-2" style={{ color: '#fff2dd', textShadow: "2px 2px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",}}>
              <h1 className="landingText">Are You Ready for a Bird's Eye View</h1>
            </div>
            <div className="col-lg-12 landingIcon pt-2" style={{ color: '#642d3c'}}>
              <button onClick={props.explore} className="btn btn-primary landingBtn" style={{width:"60vw", height:"50px", fontSize:"20px", fontWeight:"600", boxShadow:"0px 2px 5px 4px"}}>Explore</button>
            </div>
            <div className="col-lg-12 landingIcon pt-2" style={{ color: '#642d3c'}}>
              <button onClick={props.add} className="btn btn-primary landingBtn" style={{width:"60vw", height:"50px", fontSize:"20px", fontWeight:"600", boxShadow:"0px 2px 5px 4px"}}>New Sighting</button>
            </div>
            <div className="col-lg-12 landingIcon pt-2" style={{ color: '#642d3c' }}>
              <button onClick={props.map} className="btn btn-primary landingBtn" style={{width:"60vw", height:"50px", fontSize:"20px", fontWeight:"600", boxShadow:"0px 2px 5px 4px"}}>Map</button>
            </div>

          </div>
        </div>


      </React.Fragment>)
  
}