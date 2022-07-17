import React from 'react'
import '../App.css'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import logo from '../pictures/sgbirds-logo.png';
import Modal from 'react-bootstrap/Modal';

// import "bootstrap/dist/css/bootstrap.min.css"

export default class Home extends React.Component {
  url = "https://8000-samuelpng-tgc18project2-vk174li0pel.ws-us54.gitpod.io/";

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

        <div className="header">
          <img src={logo} alt="logo" height="90px" />
        </div>
        <div style={{ height: "90px" }}></div>
        <div className="p-3 mx-3 my-4 col-sm col-md col-lg">
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
        </Modal>

        <div style={{ height: "90px" }}></div>

      </React.Fragment>)
  }
}