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

  state = {
    data: [],
    modal: null,
    size: 1
  }

  async componentDidMount() {
    let response = await axios.get(this.url + 'bird_sightings')
    this.setState({
      data: response.data
    })
  }

  // async componentDidMount() {
  //   let response = await axios.get(this.url + 'bird_sightings?sort=sortByDate&limit=3')
  //   this.setState({
  //     data: response.data
  //   })
  // }

  // async componentDidMount() {
  // 	let response = await axios.get(
  // 		this.url + 'bird_sightings?sort=sortByDate&limit=3' 
  // 	);

  // 	this.setState({
  // 		data: response.data
  // 	});
  // }

  changeBirdSize = (s) => {
    if (s === 1) {
      return "Sparrow size"
    } else if (s === 2) {
      return "Between Sparrow and Blackbird size"
    } else if (s === 3) {
      return "Blackbird size"
    } else if (s === 4) {
      return "Between Blackbird and Crow Size"
    } else if (s === 5) {
      return "Crow Size"
    } else if (s === 6) {
      return "Between Crow and Goose size"
    } else {
      return "Goose size"
    }
  }

  handleModal = (birdId) => {
    this.setState({
      modal: birdId
    })
  }

  closeModal = () => {
    this.setState({
      modal: null
    })
  }


  render() {
    return (
      <React.Fragment>

        {/* <div className="header">
          <img src={logo} alt="logo" height="90px" />
        </div> */}
        {/* <div style={{ height: "87px" }}></div> */}

        {/* <div style={{height: "50vh", backgroundImage:"url('https://i.imgur.com/y38iBXT.jpg')", 
        backgroundSize: "cover", backgroundPosition: "center",backgroundRepeat:"no-repeat"}}>
          

        </div> */}
        <div className="landingPage">

          <img src={gardensBay} style={{ height: "100vh", width: "100vw", backgroundImage: "cover", objectFit: "cover" }} />
          {/* <div className="overlay2">
          SG BIRDS
          </div> */}
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
              <button className="btn btn-primary landingBtn" style={{width:"60vw", height:"50px", fontSize:"20px", fontWeight:"600", boxShadow:"0px 2px 5px 4px"}}>Explore</button>
            </div>
            <div className="col-lg-12 landingIcon pt-2" style={{ color: '#642d3c'}}>
              <button className="btn btn-primary landingBtn" style={{width:"60vw", height:"50px", fontSize:"20px", fontWeight:"600", boxShadow:"0px 2px 5px 4px"}}>New Sighting</button>
            </div>
            <div className="col-lg-12 landingIcon pt-2" style={{ color: '#642d3c' }}>
              <button className="btn btn-primary landingBtn" style={{width:"60vw", height:"50px", fontSize:"20px", fontWeight:"600", boxShadow:"0px 2px 5px 4px"}}>Map</button>
            </div>
            <div className="col-lg-12 landingIcon pt-2" style={{ color: '#642d3c' }}>
              <button className="btn btn-primary landingBtn" style={{width:"60vw", height:"50px", fontSize:"20px", fontWeight:"600", boxShadow:"0px 2px 5px 4px"}}>Profile</button>
            </div>
       
            {/* <div className="col-lg-4 landingIcon pt-3">
              Browse
              <img src={hornbill} style={{ height: "20vh" }} />
            </div>
            <div className="col-lg-4 landingIcon pt-3">
              Browse
              <img src={hornbill} style={{ height: "20vh" }} />
            </div>
            <div className="col-lg-4 landingIcon pt-3">
              Browse
              <img src={hornbill} style={{ height: "20vh" }} />
            </div> */}
          </div>
        </div>

        



        {/* 
        <div className="overlay py-3">
          <div className="container" >
            <div className="row">
              <div className="col-lg-12" style={{ display: "flex", justifyContent: "center",  }}>
                <img src={landingLogo} style={{ height: "70%" }} />
              </div>
              <div className="col-lg-12" style={{ display: "flex", justifyContent: "center",  backgroundColor:'red'   }}>
                <h1>Welcome to SG Birds.</h1>
              </div>
              <div className="col-lg-4" style={{ display: "flex", justifyContent: "center" }}>
                <img src={iconKf} style={{ height: "50%" }} />
              </div>
              <div className="col-lg-4" style={{ display: "flex", justifyContent: "center",   }}>
                <img src={iconKf} style={{ height: "50%" }} />
              </div>
              <div className="col-lg-4" style={{ display: "flex", justifyContent: "center",   }}>
                <div className="col-lg-12" ></div>
                <div className="col-lg-12" ><img src={iconKf} style={{ height: "50%" }} /></div>
              </div>
            </div>


          </div>

        </div> */}
        {/* <div className="parrot"><img src={parrot} style={{ height: "30vh" }} /></div>
        <div className="eagle"><img src={eagle} style={{ height: "35vh" }} /></div> */}




        {/* <div className="p-3 mx-3 my-4 col-sm col-md col-lg">
          {
            this.state.data.map(b => (
              <React.Fragment key={b._id}>

                <Card className="mb-3">
                  <Card.Header as="h5">{b.birdSpecies}</Card.Header>
                  <Card.Body>
                    <Card.Title>Image</Card.Title>
                    <Card.Text>
                      <h5>Bird Size: {this.changeBirdSize(b.birdSize)}</h5>
                      <h5>Neightbourhood Spotted: {b.neighbourhoodSpotted}</h5>
                      <h5>Bird Colours: {b.birdColours.map(c => (<span>{c},&nbsp;</span>))}</h5>
                    </Card.Text>
                    <Button variant="primary" onClick={() => { this.handleModal(b._id) }}>More</Button>
                  </Card.Body>
                </Card>

              </React.Fragment>
            ))
          }
        </div>
        
        <Modal show={this.state.modal !== null} onHide={() => { this.closeModal() }} centered>
        
            {this.state.data.map(b => {
              
                if (this.state.modal === b._id) {
                  return(
                  <React.Fragment key={b._id}>

                  
                      <Modal.Header closeButton >{b.birdSpecies}</Modal.Header>
                      <Modal.Body>
                          <h5>Bird Size: {this.changeBirdSize(b.birdSize)}</h5>
                          <h5>Neightbourhood Spotted: {b.neighbourhoodSpotted}</h5>
                          <h5>Bird Colours: {b.birdColours.map(c => (<span>{c},&nbsp;</span>))}</h5>
                          <hr></hr>
                          <h6 style={{ color: "#642d3c"}} >Comments</h6>
                          <hr></hr>
                          <label style={{ color: "#642d3c"}} >Display Name</label>
                         <input type="text" className="form-control"></input>
                         <label style={{ color: "#642d3c"}} >Comment</label>
                         <textarea className="form-control"></textarea>
                        </Modal.Body>
                 

                  </React.Fragment>)
                }
              
            })
            }
         
          <Modal.Footer><button className="btn btn-primary"
            onClick={() => { this.closeModal() }}>
            Close</button></Modal.Footer>
        </Modal> */}

        {/* <div style={{ height: "90px" }}></div> */}

      </React.Fragment>)
  }
}