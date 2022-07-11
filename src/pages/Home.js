import React from 'react'
import '../App.css'
import axios from 'axios';
import logo from '../pictures/sgbirds-logo.png';
// import "bootstrap/dist/css/bootstrap.min.css"

export default class Home extends React.Component {
  url = "https://3000-samuelpng-tgc18project2-vk174li0pel.ws-us53.gitpod.io/";

  state = {
    data: []
  }

  async componentDidMount() {
    let response = await axios.get(this.url + 'bird_sightings')
    this.setState({
      data: response.data
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="header">
          <img src={logo} alt="logo" height="90px" />
        </div>
        <div style={{ height: "90px" }}></div>
        <div>
          {
            this.state.data.map( b => (
              <React.Fragment key = {b._id}>
                <div className="card p-2 my-1">
                  <h3 className = "title"> {b.birdSpecies} </h3>
                  <div className = "body">
                    <h5>Bird Size: {b.birdSize}</h5>
                    <h5>Neightbourhood Spotted: {b.neighbourhoodSpotted}</h5>
                    <h5>Bird Colours: {b.birdColours.map( c => (<span>{c},&nbsp;</span>))}</h5>
                  </div>
                </div>
              </React.Fragment>
            ))
          }
        </div>
      </React.Fragment>)
  }
}