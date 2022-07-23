import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import '../App.css';
import logo from '../pictures/sgbirds-logo.png';
import marker from '../pictures/marker.png';
import axios from "axios";
import L from 'leaflet';


const markerIcon = new L.Icon({
    iconUrl: marker,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [40, 40],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});

export default class Map extends React.Component {

    // url = "https://8000-samuelpng-tgc18project2-vk174li0pel.ws-us54.gitpod.io/";
    url = "https://sgbirds.herokuapp.com/"

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
                <div style={{display: "flex"}}>
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
                </div>

                <div style={{ height: "90px" }}></div>
                <MapContainer center={[1.3521, 103.8198]} zoom={12} scrollWheelZoom={true}>
                    <TileLayer
                        // attribution='&copy; <a href="https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png">OpenStreetMap</a> contributors'
                        url='https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png'
                    />

                    
                    {this.state.birdMarkers.map(b => {
                        if (b.locationSpotted.lat !== null && b.locationSpotted.lat !== "") {
                            return(
                                <Marker position={[parseFloat(b.locationSpotted.lat), parseFloat(b.locationSpotted.lng)] } 
                                key={b.id}
                                icon={markerIcon}
                                >
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