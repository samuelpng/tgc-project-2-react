import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import '../App.css';
import logo from '../pictures/sgbirds-logo.png';
import marker from '../pictures/marker.png';
import axios from "axios";
import L from 'leaflet';
import { Card, Button, Modal, Accordion } from "react-bootstrap";


const markerIcon = new L.Icon({
    iconUrl: marker,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [40, 40],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});

export default class Map extends React.Component {

    url = "https://sgbirds.herokuapp.com/"

    state = {
        birdMarkers: [],
        birdFamily: "",
        email: "",
        modal: null,
        commentDisplayName: "",
        commentDescription: "",
        contentLoaded: true
    }

    birdFamily = {
        myArray: ["chicken", "eagle", "falcon", "hawk", "hornbills", "hummingbird", "kingfisher", "owl", "pigeons", "sparrow",
            "storks", "waterfowl", "woodpeckers", "others"]
    }

    mapSearch = async () => {
        this.setState({
            contentLoaded: false
        })

        let response = await axios.get(this.url + 'bird_sightings', {
            params: {
                email: this.state.email,
                birdFamily: this.state.birdFamily
            }
        })

        this.setState({
            birdMarkers: response.data,
            contentLoaded: true
        })
    }

    postComment = async () => {
        this.setState({
            commentDisplayName: "",
            commentDescription: ""
        })

        await axios.post(this.url + `bird_sightings/comments/${this.state.modal}`, {
            displayName: this.state.commentDisplayName,
            commentDescription: this.state.commentDescription
        })

        let response = await axios.get(this.url + 'bird_sightings', {
            params: {
                email: this.state.email,
                birdFamily: this.state.birdFamily
            }

        })
        this.setState({
            birdMarkers : response.data
        })

    }



    updateFormField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleModal = (birdId) => {
        this.setState({
            modal: birdId
        })
    }

    closeModal = () => {
        this.setState({
            modal: null,
            delete: false
        })
    }



    render() {

        return (
            <React.Fragment>
                <div className="header">
                    <img src={logo} alt="logo" height="90px" />
                </div>

                {this.state.contentLoaded ? null : <div class="loader" style={{left:"50vw", zIndex:10}}></div>}
                <div className="mapFilter">
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Header>Search</Accordion.Header>
                            <Accordion.Body>
                                <div className="label"><h6 style={{ color: "#642d3c" }}>View My Sightings</h6></div>
                                <input type="text" className="form-control" placeholder="Your email address..."></input>
                                <div className="label pt-2" style={{ color: "#642d3c" }}><h6>Bird Family</h6></div>
                                <div style={{ display: "flex" }}>
                                    <select className="form-select form-control" name="birdFamily"
                                        value={this.state.birdFamily} onChange={this.updateFormField}
                                    >
                                        <option name="birdFamily" key="placeHolder" value="">--Select One--</option>
                                        {this.birdFamily.myArray.map(f =>
                                            <option name="birdFamily" key={f} value={f} >
                                                {f[0].toUpperCase() + f.substring(1)}
                                            </option>
                                        )}
                                    </select>

                                </div>
                                <div><button className="btn btn-primary" style={{ width: "100%" }} onClick={this.mapSearch}>Go</button></div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </div>

                <div style={{ height: "90px" }}></div>
                <MapContainer center={[1.3521, 103.8198]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                       
                        url='https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png'
                    />


                    {this.state.birdMarkers.map(b => {
                        if (b.locationSpotted.lat !== null && b.locationSpotted.lat !== "") {
                            return (
                                <Marker position={[parseFloat(b.locationSpotted.lat), parseFloat(b.locationSpotted.lng)]}
                                    key={b.id}
                                    icon={markerIcon}
                                >
                                    <Popup>


                                        <Card>
                                            <Card.Header >{b.birdSpecies}</Card.Header>
                                         
                                            <Card.Body>
                                                <Card.Title>

                                             
                                                    <img src={b.imageUrl} style={{ width: "100%" }} />
                                                </Card.Title>
                                                <Card.Text>
                                             

                                                    <div>The {b.birdSpecies} was spotted at {b.neighbourhoodSpotted} on {b.dateSpotted} .</div>
                                                    <br />
                                                    

                                                </Card.Text>
                                                <Button variant="primary" onClick={() => { this.handleModal(b._id) }}>More</Button>
                                            </Card.Body>
                                        </Card>

                                    </Popup>
                                </Marker>
                            )
                        }
                    })}


                </MapContainer>


                <Modal show={this.state.modal !== null} onHide={() => { this.closeModal() }} size="lg" centered>

                    {this.state.birdMarkers.map(b => {

                        if (this.state.modal === b._id) {
                            return (
                                <React.Fragment key={b._id}>


                                    <Modal.Header closeButton>{b.birdSpecies}</Modal.Header>
                                    <Modal.Body>
                                      
                                        <img src={b.imageUrl} style={{ width: "100%" }} />
                                        <div className="mt-3">The {b.birdSpecies} was spotted at {b.neighbourhoodSpotted} on {b.dateSpotted} .</div>
                                        <br />
                                        <div><h6>Family:</h6>{b.birdFamily}</div>
                                        <div><h6>Bird Colours:</h6></div>
                                        <div>{b.birdColours.map(c => (<span className="badge badge-pill me-2 mt-2"
                                            style={{ backgroundColor: `${c}`, color: "#e8c6a2", height: "25px", fontSize: "15px" }}>{c}&nbsp;</span>))}</div>
                                        <div>Eating Habits: {b.character.eatingHabits.map(e => (<span className="badge badge-pill me-2 mt-2"
                                            style={{ backgroundColor: `#e8c6a2`, color: "#642d3c", height: "25px", fontSize: "15px" }}>{e}&nbsp;</span>))}</div>
                                        <br />
                                        <div>Behaviour: {b.character.behaviour.map(b => (<span className="badge badge-pill me-2 mt-2"
                                            style={{ backgroundColor: `#e8c6a2`, color: "#642d3c", height: "25px", fontSize: "15px" }}>{b}&nbsp;</span>))}</div>
                                        <div>Posted by:</div>
                                        <div>{b.displayName}</div>
                                        <div>{b.datePosted.slice(0, 10)}</div>
                                        <br />
                                        <div style={{ color: "#642d3c" }}><h5>Comments</h5></div>

                                        <hr></hr>
                                        {b.comments !== undefined ? b.comments.map(c =>
                                            <span>

                                                <h6>{c.displayName}</h6>
                                                <p>{c.commentDescription}</p>
                                                <p>{c.datePosted.slice(0, 10)}</p>
                                                <hr></hr>
                                            </span>
                                        )
                                            :
                                            <div>
                                                <p>There are no comments for this sighting</p>
                                                <hr></hr>
                                            </div>
                                        }


                                        <h5 style={{ color: "#642d3c" }}>New Comment</h5>
                                        <label style={{ color: "#642d3c" }} >Display Name</label>
                                        <input type="text" className="form-control" name="commentDisplayName"
                                            onChange={this.updateFormField} value={this.state.commentDisplayName}></input>
                                        <label style={{ color: "#642d3c" }} >Comment</label>
                                        <textarea className="form-control" onChange={this.updateFormField}
                                            name="commentDescription" value={this.state.commentDescription}></textarea>

                                        <button className="btn btn-primary mt-3" onClick={this.postComment}>Post</button>
                                    </Modal.Body>

                                </React.Fragment>)
                        }

                    })
                    }

                    <Modal.Footer>
                   
                        <button className="btn"
                            onClick={this.deleteAlert}
                            style={{ backgroundColor: "#e8c6a2", color: "#642d3c", fontWeight: "600", borderColor: "crimson" }}>
                            Delete</button>
                        <button className="btn"
                            onClick={this.updateSighting}
                            style={{ backgroundColor: "#e8c6a2", color: "#642d3c", fontWeight: "600", borderColor: "green" }}>
                            Update</button>
                    </Modal.Footer>
                </Modal>

            </React.Fragment>


        )
    }
}