import React from 'react';
import '../App.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Card, Badge, Alert, Container, Row, Col } from 'react-bootstrap';
import Update from './Update.js'
import Swal from "sweetalert2";  
import logo from '../pictures/sgbirds-logo.png';
import BirdCard from './BirdCard';


export default class Profile extends React.Component {

    url = "https://8000-samuelpng-tgc18project2-vk174li0pel.ws-us54.gitpod.io/";
    // url = "https://sgbirds.herokuapp.com/"
    state = {
        loginData: [],
        modal: null,
        email: "",
        displayName: "",
        submit: false,
        commentDisplayName: "",
        commentDescription: "",
        update: false,
        delete: false
    }

    updateFormField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    retrieveSightings = async () => {
        let response = await axios.get(this.url + `bird_sightings`, {
            params: {
                email: this.state.email
            }
        }
        )
        this.setState({
            loginData: response.data
        })
    }
    //havent done express for this

    handleModal = (birdId) => {
        this.setState({
            modal: birdId
        })
    }

    closeModal = () => {
        this.setState({
            modal: null,
        })
    }

    updateSighting = () => {
        this.setState({
            update: true
        })
    }

    deleteAlert = async() => {
        Swal.fire({  
            text: 'This action is irreversible',  
            title: 'Confirm Delete?',  
            // imageUrl: `${this.state.imageUrl}` ,
            imageWidth: 300,
            imageHeight: 200,
            icon: 'warning',   
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "Delete",
            showCancelButton: true,
            allowOutsideClick: false  
          }).then((result)=>{
            if(result.isDenied){
                Swal.fire('Deleted!', 'Your sighting has been deleted', 'success')
                this.deleteSighting()
            }
          })
        // this.setState({
        //     delete: true
        // })
    }

    // cancelDelete = () => {
    //     this.setState({
    //         delete: false
    //     })
    // }

    deleteSighting = async () => {
        await axios.delete(this.url + `bird_sightings/${this.state.modal}`)
    }

    backToProfile = async() => {
        this.setState({
            update: false
        })
        let response = await axios.get(this.url + `bird_sightings`, {
            params: {
                email: this.state.email
            }
        }
        )
        this.setState({
            loginData: response.data
        })
    }

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

    postComment = async () => {
        this.setState({
            submit: true,
            commentDisplayName : "",
            commentDescription : ""
        })

        await axios.post(this.url + `bird_sightings/comments/${this.state.modal}`, {
            displayName: this.state.commentDisplayName,
            commentDescription: this.state.commentDescription
        })

        let response = await axios.get(this.url + `bird_sightings`, {
            params: {
                email: this.state.email
            }
        }
        )
        this.setState({
            loginData: response.data
        })

    }

    render() {
        return (

            <React.Fragment>
                {this.state.update === false ?
                
                
                // Render normal Profile Page
                
                    <div>
                        <div className="header">
                            <img src={logo} alt="logo" height="90px" />
                        </div>
                        <div style={{ height: "90px" }}></div>
                    
                 
                        
                        <div className="container p-4">
                         <div className="row">
                        {/* p-3 mx-3 my-4 col-sm col-md col-lg */}
                            {/* email validation */}
                            <div className="profileBar">
                                <h5 style={{ color: "#642d3c" }}>View My Sightings</h5>
                                <input type="text" className="form-control mt-2"
                                    name="email" value={this.state.email}
                                    onChange={this.updateFormField}
                                    placeholder="Retrieve by email..." />
                                <button className="btn mt-2 mb-3" onClick={this.retrieveSightings}
                                    style={{ backgroundColor: "#fff2dd", color: "#642d3c", fontWeight: "600" }}
                                >Retrieve</button>
                            </div>


                            {/* Result Cards */}
                            <div className="row">
                            {
                                this.state.loginData.map(b => (
                                    <React.Fragment key={b._id}>

                                        <Card className="col-lg-4 ">
                                            <Card.Header >{b.birdSpecies}</Card.Header>
                                            {/* <img src={b.imageUrl} style={{ width: "100%" }} /> */}
                                            <Card.Body>
                                                <Card.Title>

                                                    {/* {b.birdSpecies} */}
                                                    <img src={b.imageUrl} style={{ width: "100%" }} />
                                                </Card.Title>
                                                <Card.Text>
                                                    {/* <h5>Bird Size: {this.changeBirdSize(b.birdSize)}</h5> */}

                                                    <div>The {b.birdSpecies} was spotted at {b.neighbourhoodSpotted} on {b.dateSpotted} .</div>
                                                    <br />
                                                    <div style={{display: 'flex'}}><h6>Family:&nbsp;</h6>{b.birdFamily[0].toUpperCase() + b.birdFamily.substring(1)}</div>
                                                    <div><h6>Bird Colours:</h6></div>
                                                    <div>{b.birdColours.map(c => (<span className="badge badge-pill me-2 mt-2"
                                                        style={{ backgroundColor: `${c}`, color: "#e8c6a2", height: "25px", fontSize: "15px" }}>{c}&nbsp;</span>))}</div>
                                                    <br />
                                                    
                                                    <div>Behaviour: </div>
                                                    <div>Posted by:</div>
                                                    <div>{b.displayName}</div>
                                                    <div>{b.datePosted.slice(0, 10)}</div>

                                                </Card.Text>
                                                <Button variant="primary" onClick={() => { this.handleModal(b._id) }}>More</Button>
                                            </Card.Body>
                                        </Card>

                                    </React.Fragment>
                                ))
                            }
                            </div>
                        </div>
                     

                        {/* Modal or each result */}

                        <Modal show={this.state.modal !== null} onHide={() => { this.closeModal() }} size="lg" centered>

                            {this.state.loginData.map(b => {

                                if (this.state.modal === b._id) {
                                    return (
                                        <React.Fragment key={b._id}>


                                            <Modal.Header closeButton>{b.birdSpecies}</Modal.Header>
                                            <Modal.Body>
                                                {/* <h5>Bird Size: {this.changeBirdSize(b.birdSize)}</h5>
                                                <h5>Neightbourhood Spotted: {b.neighbourhoodSpotted}</h5>
                                                <h5>Bird Colours: {b.birdColours.map(c => (<span>{c},&nbsp;</span>))}</h5>

                                                <hr></hr>
                                                <h5 style={{ color: "#642d3c" }} >Comments</h5> */}
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
                                                <div style = {{color: "#642d3c"}}><h5>Comments</h5></div>
                             
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
                                {/* <button className="btn btn-primary"
                                onClick={() => { this.closeModal() }}>
                                Close</button> */}
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

                        <div style={{ height: "90px" }}></div>
                    
                    </div>
                    </div>
               
                    :
                    <Update modal={this.state.modal} backToProfile={this.backToProfile} />
                }
            </React.Fragment>

        )
    }

}