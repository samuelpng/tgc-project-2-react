import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import '../App.css';
import logo from '../pictures/sgbirds-logo.png';
import axios from "axios";

export default class Map extends React.Component {

    url = "https://8000-samuelpng-tgc18project2-vk174li0pel.ws-us54.gitpod.io/";

    state = {
        birdMarkers: [],
        birdFamily: "sparrow"
    }

    birdFamily = {
        myArray: ["sparrow", "eagle", "raven"]
    }

    // mapSearch = async () => {
    //     let response = await axios.get(this.url + 'bird_sightings', {
    //         params: {
    //             birdFamily: this.state.birdFamily
    //         }
    //     })

    //     this.setState({
    //         birdMarkers: response.data
    //     })
    // }

    mapSearch = async () => {
        let response = await axios.get(this.url + 'bird_sightings')
        this.setState({
            birdMarkers: response.data
        })
    }

    updateFormField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    render() {
        return (
            <React.Fragment>
                <div className="header">
                    <img src={logo} alt="logo" height="90px" />
                </div>

                <div className="mapFilter">
                    <div className="label ms-3" style={{ color: "#642d3c" }}><h6>Bird Family</h6></div>
                    <select className="form-select form-control ms-3" name="birdFamily"
                        value={this.state.birdFamily} onChange={this.updateFormField}
                        style={{ width: "60%" }}>
                        <option name="birdFamily" key="placeHolder">--Select One--</option>
                        {this.birdFamily.myArray.map(f =>
                            <option name="birdFamily" key={f} value={f} >
                                {f[0].toUpperCase() + f.substring(1)}
                            </option>
                        )}
                    </select>
                    <button className="btn btn-primary ms-3" onClick={this.mapSearch}>Go</button>
                </div>

                <div style={{ height: "90px" }}></div>
                <MapContainer center={[1.3521, 103.8198]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    
                    {this.state.birdMarkers.map(b => {
                        if (b.locationSpotted.lat !== null && b.locationSpotted.lat !== "") {
                            return(
                                <Marker position={[parseFloat(b.locationSpotted.lat), parseFloat(b.locationSpotted.lng)]}>
                                <Popup>
                                    <h5>{b.birdSpecies}</h5>
                                    <h6>{b.birdSize}</h6>
                                </Popup>
                            </Marker>
                            )
                        }
                     })}


                </MapContainer>
            </React.Fragment>
        )
    }
}