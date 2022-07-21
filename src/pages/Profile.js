import React from 'react';
import '../App.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import Update from './Update.js'
import logo from '../pictures/sgbirds-logo.png';

export default class Profile extends React.Component {

    // url = "https://8000-samuelpng-tgc18project2-vk174li0pel.ws-us54.gitpod.io/";
    url = "https://sgbirds.herokuapp.com/"
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

    retrieveSightings = async() => {
        let response = await axios.get(this.url + `bird_sightings`,{
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
            delete: false
        })
    }

    updateSighting = () => {
        this.setState({
            update: true
        })
    }

    deleteAlert = () => {
        this.setState({
            delete: true
        })
    }

    cancelDelete = () => {
        this.setState({
            delete: false
        })
    }

    deleteSighting = async () => {
        await axios.delete(this.url + `bird_sightings/${this.state.modal}`)
    }

    backToProfile = () => {
        this.setState({
            update: false
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
            submit: true
        })

        await axios.post(this.url + `bird_sightings/comments/${this.state.modal}`, {
            displayName: this.state.commentDisplayName,
            commentDescription: this.state.commentDescription
        })
    }

    render() {
        return (

            <React.Fragment>
                {this.state.update === false ?
                    <div>
                        <div className="header">
                            <img src={logo} alt="logo" height="90px" />
                        </div>
                        <div style={{ height: "90px" }}></div>

                        <div className="p-3 mx-3 my-4 col-sm col-md col-lg">
                            {/* login validation */}
                            <div>
                                <h5 style={{color: "#642d3c"}}>View My Sightings</h5>
                                <input type="text" className="form-control mt-2"
                                    name="email" value={this.state.email}
                                    onChange={this.updateFormField} 
                                    placeholder="Retrieve by email..."/>
                                <button className="btn mt-2 mb-3" onClick = {this.retrieveSightings}
                                style={{ backgroundColor: "#fff2dd", color: "#642d3c", fontWeight: "600" }}
                                >Retrieve</button>
                            </div>
                            

                            {/* Reult Cards */}
                            {
                                this.state.loginData.map(b => (
                                    <React.Fragment key={b._id}>

                                        <Card className="mb-3">
                                            <Card.Header >{b.birdSpecies}</Card.Header>
                                            <Card.Body>
                                                <Card.Title>
                                                    
                                                    {/* {b.birdSpecies} */}
                                                    <img src={b.imageUrl} style={{width:"100%"}}/>
                                                </Card.Title>
                                                <Card.Text>
                                                    {/* <h5>Bird Size: {this.changeBirdSize(b.birdSize)}</h5> */}
                                                    
                                                    <div>The {b.birdSpecies} was spotted at {b.neighbourhoodSpotted} on {b.dateSpotted} .</div>
                                                    <div>Family: {b.birdFamily} </div>
                                                    <br/>
                                                    <div>Bird Colours:</div>
                                                    <div>{b.birdColours.map(c => (<span>{c},&nbsp;</span>))}</div>
                                                    <br />
                                                    <div>Posted by:</div>
                                                    <div>{b.displayName}</div>
                                                    <div>{b.datePosted.slice(0,10)}</div>
                                                    
                                                </Card.Text>
                                                <Button variant="primary" onClick={() => { this.handleModal(b._id) }}>More</Button>
                                            </Card.Body>
                                        </Card>

                                    </React.Fragment>
                                ))
                            }
                        </div>

                        <Modal show={this.state.modal !== null} onHide={() => { this.closeModal() }} centered>

                            {this.state.loginData.map(b => {

                                if (this.state.modal === b._id) {
                                    return (
                                        <React.Fragment key={b._id}>


                                            <Modal.Header closeButton>{b.birdSpecies}</Modal.Header>
                                            <Modal.Body>
                                                <h5>Bird Size: {this.changeBirdSize(b.birdSize)}</h5>
                                                <h5>Neightbourhood Spotted: {b.neighbourhoodSpotted}</h5>
                                                <h5>Bird Colours: {b.birdColours.map(c => (<span>{c},&nbsp;</span>))}</h5>

                                                <hr></hr>
                                                <h5 style={{ color: "#642d3c" }} >Comments</h5>
                                                <br />
                                                {b.comments !== undefined ? b.comments.map(c =>
                                                    <span>

                                                        <h6>{c.displayName}</h6>
                                                        <p>{c.commentDescription}</p>
                                                        <p>{c.datePosted.slice(0, 9)}</p>
                                                        <hr></hr>
                                                    </span>
                                                )
                                                    : <></>}


                                                <h5 style={{ color: "#642d3c" }}>New Comment</h5>
                                                <label style={{ color: "#642d3c" }} >Display Name</label>
                                                <input type="text" className="form-control" name="commentDisplayName"
                                                    onChange={this.updateFormField} value={this.state.commentDisplayName}></input>
                                                <label style={{ color: "#642d3c" }} >Comment</label>
                                                <textarea className="form-control" onChange={this.updateFormField}
                                                    name="commentDescription" value={this.state.commentDescription}></textarea>
                                                    
                                                <button className="btn btn-primary mt-3" onClick={this.postComment}>Post</button>
                                            </Modal.Body>

                                            {/* Delete Alert */}
                                            {/* <Modal show={this.state.delete} centered >
                                                <Modal.Body>
                                                    <div style={{ color: "#642d3c", display: "flex", justifyContent: "center" }}>
                                                        <h3>Are you sure you want to Delete {b.birdSpecies}</h3>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "center" }} className="mt-3">
                                                        <button className="btn btn-primary" onClick={this.deleteSighting}>Delete</button>
                                                    </div>
                                                </Modal.Body>
                                            </Modal> */}
                                            <Alert variant="danger" show={this.state.delete}>
                                                <Alert.Heading>Are you sure you want to Delete {b.birdSpecies}?</Alert.Heading>
                                                <button className="btn" onClick={this.deleteSighting}
                                                    style={{ backgroundColor: "crimson", color: "#e8c6a2", fontWeight: "600", borderColor: "#642d3c" }}
                                                >Delete</button>
                                                <button className="btn btn-success ms-3" onClick={this.cancelDelete}
                                                    style={{ backgroundColor: "39ff14", color: "#e8c6a2", fontWeight: "600", borderColor: "green" }}
                                                >Cancel</button>
                                            </Alert>

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
                    :
                    <Update modal={this.state.modal} backToProfile={this.backToProfile} />
                }
            </React.Fragment>

        )
    }

}