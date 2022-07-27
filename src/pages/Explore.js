import React from 'react';
import axios from 'axios';
import '../App.css';
import { Card, Button, Modal, Dropdown, Alert } from 'react-bootstrap';
import logo from '../pictures/sgbirds-logo.png';
import Accordion from 'react-bootstrap/Accordion';
import sparrow from '../pictures/sparrow.png';
import blackbird from '../pictures/blackbird.png';
import crow from '../pictures/crow.png';
import goose from '../pictures/goose.png'

export default class Explore extends React.Component {


    url = "https://sgbirds.herokuapp.com/"

    state = {
        data: [],
        searchInput: "",
        searchSize: [],
        searchFamily: [],
        searchNeighbourhood: [],
        searchColours: [],
        searchResults: [],
        sortBy: "latest",
        modal: null,
        commentDisplayName: "",
        commentDescription: "",
        noResult: false,
        contentLoaded: false
    }

    birdSize = {
        myArray: ["1", "2", "3", "4", "5", "6", "7"]
    }

    birdColours = {
        myArray: ['black', 'grey', 'white', 'brown', 'red',
            'blue', 'green', 'yellow', 'orange'],
    }

    neighbourhoodSpotted = {
        myArray: ["Aljunied", "Ang Mo Kio", "Balestier", "Bartley", "Bayfront", "Beach Road", "Beauty World", "Bedok", "Bishan", "Botanic Gardens", "Braddell", "Bras Basah", "Buangkok", "Bugis", "Bukit Batok", "Bukit Giombak", "Buki Timah",
            "Buona Vista", "Changi", "Changi", "Choa Chu Kang", "City Hall", "Clementi", "Commonwealth", "Dhoby Ghaut", "Dover", "Downtown",
            "East Coast", "Eunos", "Farrer Park", "Fort Canning", "Geylang", "Great World", "Harbourfront", "Holland Village", "Hougang",
            "Jalan Besar", "Jalan Kayu", "Joo Chiat", "Jurong East", "Kallang", "Katong", "Kembangan", "Kent Ridge", "Khatib", "Kovan",
            "Lavender", "Little India", "Macpherson", "Marina Bay", "Marine Parade", "Mountbatten", "Newton", "Novena", "Orchard", "Outram Park",
            "Pasir Panjang", "Pasir Ris", "Paya Lebar", "Potong Pasir", "Punggol", "Queenstown", "Raffles Place", "Redhill", "Seletar", "Sembawang",
            "Sengkang", "Serangoon", "Siglap", "Simei", "Somerset", "Tai Seng", "Tampines", "Tanah Mearh", "Tanjong Katong", "Tanjong Pagar",
            "Thomson", "Tiong Bahru", "Toa Payoh", "Tuas", "West Coast", "Woodlands", "Yio Chu Kang", "Yishun"]
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
            commentDisplayName: "",
            commentDescription: ""
        })

        await axios.post(this.url + `bird_sightings/comments/${this.state.modal}`, {
            displayName: this.state.commentDisplayName,
            commentDescription: this.state.commentDescription
        })

        let response = await axios.get(this.url + 'bird_sightings', {
            params: {
                searchQuery: this.state.searchInput,
                birdSize: this.state.searchSize,
                birdColours: this.state.searchColours,
                neighbourhoodSpotted: this.state.searchNeighbourhood,
                sort: this.state.sortBy
            }

        })
        this.setState({
            searchResults : response.data
        })

    }

    updateFormField = (e) => {
        if (e.target.type === 'checkbox') {
            if (this.state[e.target.name].includes(e.target.value)) {
                let indexToRemove = this.state[e.target.name].indexOf(e.target.value);

                let cloned = this.state[e.target.name].slice();

                cloned.splice(indexToRemove, 1);

                this.setState({
                    [e.target.name]: cloned
                })
            } else {
                let cloned = this.state[e.target.name].slice();
                cloned.push(e.target.value)
                this.setState({
                    [e.target.name]: cloned
                })
            }
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })

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

    async componentDidMount() {
        let response = await axios.get(this.url + 'bird_sightings')
        this.setState({
            searchResults: response.data,
            contentLoaded: true
        })
    }

    updateSearch = async () => {
        let response = await axios.get(this.url + 'bird_sightings', {
            params: {
                searchQuery: this.state.searchInput,
                birdSize: this.state.searchSize,
                birdColours: this.state.searchColours,
                neighbourhoodSpotted: this.state.searchNeighbourhood,
                sort: this.state.sortBy
            }

        })

        this.setState({
            searchResults: response.data,
            noResult: false
        })

        if (response.data.length === 0) {
            this.setState({
                noResult: true
            })
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className="nonFixedHeader">
                    <img src={logo} alt="logo" height="90px" />
                </div>
                <div className="desktopPadding"></div>

                {this.state.contentLoaded ? null : <div class="loader"></div>}
                <div className="container-fluid p-3">
                    <div className="row">

                        <div className="col-md-5 col-lg-3">

                            {/* <div >
                                <h2 style={{ color: "#642d3c" }} className="mb-3">Explore</h2>
                            </div> */}
                            <Accordion>
                                <Accordion.Item>
                                    <Accordion.Header><span style={{ color: "#642d3c", fontWeight: "500" }}>Search</span></Accordion.Header>
                                    <Accordion.Body>
                                        <div className="row search-form">
                                            <div>
                                                <label style={{ color: "#642d3c" }}> Search based on Keywords </label>
                                                <input className="form-control" type="text"
                                                    name="searchInput"
                                                    value={this.state.searchInput}
                                                    onChange={this.updateFormField} />
                                            </div>
                                            <div>
                                                <div>
                                                    <label className="mt-2" style={{ color: "#642d3c" }}>Bird Size</label>
                                                </div>
                                                <div style={{ height: '52px' }}></div>
                                                <div>
                                                    <div style={{ position: 'relative' }}>
                                                        <label for="1" style={{ position: 'absolute', bottom: '0', left: '5px' }}><img src={sparrow} alt="sparrow" height="15px" /></label>
                                                        <label for="3" style={{ position: 'absolute', bottom: '0', left: '75px' }}><img src={blackbird} alt="blackbird" height="25px" /></label>
                                                        <label for="5" style={{ position: 'absolute', bottom: '0', left: '143px' }}><img src={crow} alt="crow" height="35px" /></label>
                                                        <label for="7" style={{ position: 'absolute', bottom: '0', left: '220px' }}><img src={goose} alt="goose" height="50px" /></label>
                                                    </div>
                                                </div>
                                                {this.birdSize.myArray.map(s =>
                                                    <input type="checkbox" value={s} key={s} id={s}
                                                        onChange={this.updateFormField} className="me-4" name="searchSize"
                                                        checked={this.state.searchSize.includes(`${s}`)} />)}
                                            </div>
                                            {/* <div>
                                        <label className="mt-2" style={{ color: "#642d3c" }}>Bird Colours</label>
                                        <div>
                                            {this.birdColours.myArray.map(c =>
                                                <span>
                                                    <label for={c} className="me-2">{c[0].toUpperCase() + c.substring(1)}</label>
                                                    <input type="checkbox" value={c} key={c} id={c}
                                                        onChange={this.updatebirdSize} className="me-4"
                                                        checked={this.state.birdSize.includes(`${c}`)} />
                                                </span>
                                            )}
                                        </div>
                                    </div> */}
                                            <div>
                                                <Accordion defaultActiveKey="0" flush>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header><span className="mt-2" style={{ color: "#642d3c" }}>Bird Colours</span></Accordion.Header>
                                                        <Accordion.Body>
                                                            <div>
                                                                {this.birdColours.myArray.map(c =>
                                                                    <div>
                                                                        <input type="checkbox" value={c} key={c} id={c}
                                                                            onChange={this.updateFormField} className="me-3" name="searchColours"
                                                                            checked={this.state.searchColours.includes(`${c}`)} />
                                                                        <label for={c} className="me-1">{c[0].toUpperCase() + c.substring(1)}</label>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </div>
                                            <div className="label mt-3" style={{ color: "#642d3c" }}>Neighbourhood Spotted</div>
                                            <select className="form-select form-control ms-2" name="searchNeighbourhood"
                                                value={this.state.searchNeighbourhood} onChange={this.updateFormField}
                                                style={{ width: "80%" }}>
                                                <option value="" key="placeHolder">--Select One--</option>
                                                {this.neighbourhoodSpotted.myArray.map(n =>
                                                    <option className="form-control" key={n} value={n}>{n}</option>
                                                )}
                                            </select>
                                            <div><label className="mt-3" style={{ color: "#642d3c" }}>Sort By:</label></div>
                                            <select className="form-select form-control ms-2" name="sortBy"
                                                value={this.state.sortBy} onChange={this.updateFormField}
                                                style={{ width: "50%" }}>
                                                {/* <option value="" key="placeHolder">--Select One--</option> */}
                                                <option className="form-control" key="latest" value="latest">Latest</option>
                                                <option className="form-control" key="alphebatically" value="alphebatically">Alphabetically</option>
                                                <option className="form-control" key="birdFamily" value="birdFamily">Bird Family</option>

                                            </select>

                                            <div>
                                                <button className="btn mt-3" style={{ backgroundColor: "#fff2dd", color: "#642d3c", fontWeight: "600", borderColor: "#282c34" }}
                                                    onClick={
                                                        () => {
                                                            this.updateSearch()
                                                        }
                                                    }>Search</button>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>


                        </div>


                        {/* Show Search Results */}

                        <div className="col-md-7 col-lg-9">
                            <div className="row">
                                {this.state.noResult ? <Alert variant="dark" style={{ display: 'flex', justifyContent: 'center' }}>No Results Found</Alert> : null}
                                {
                                    this.state.searchResults.map(b => (
                                        <React.Fragment key={b._id}>

                                            <Card className="col-lg-4 col-md-6 ">
                                                <Card.Header >{b.birdSpecies}</Card.Header>
                                                {/* <img src={b.imageUrl} style={{ width: "100%" }} /> */}
                                                <Card.Body>
                                                    <Card.Title>

                                                        {/* {b.birdSpecies} */}
                                                        <img src={b.imageUrl} style={{ width: "100%" }} />
                                                    </Card.Title>
                                                    <Card.Text>
                                                        <div>{b.description}</div>
                                                        <br />
                                                        <div>The {b.birdSpecies} was spotted at {b.neighbourhoodSpotted} on {b.dateSpotted} .</div>
                                                        <br />
                                                        <div style={{ display: 'flex' }}><h6>Family:&nbsp;</h6>{b.birdFamily[0].toUpperCase() + b.birdFamily.substring(1)}</div>
                                                        <div><h6>Bird Colours:</h6></div>
                                                        <div>{b.birdColours.map(c => (<span className="badge badge-pill me-2 mt-2"
                                                            style={{ backgroundColor: `${c}`, color: "#e8c6a2", height: "25px", fontSize: "15px" }}>{c}&nbsp;</span>))}</div>
                                                        <br />


                                                        <div><h6>Posted By:</h6></div>
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
                    </div>
                </div>

                <Modal show={this.state.modal !== null} onHide={() => { this.closeModal() }} size="lg" centered>

                    {this.state.searchResults.map(b => {

                        if (this.state.modal === b._id) {
                            return (
                                <React.Fragment key={b._id}>


                                    <Modal.Header closeButton>{b.birdSpecies}</Modal.Header>
                                    <Modal.Body>
                                       
                                    <img src={b.imageUrl} style={{ width: "100%" }} />
                                                    <div className="mt-3">{b.description}</div>
                                                    <div className="mt-3">The {b.birdSpecies} was spotted at {b.neighbourhoodSpotted} on {b.dateSpotted} .</div>
                                                    <br />
                                                    <div><h6>Family:</h6>{b.birdFamily}</div>
                                                    <div><h6>Bird Colours:</h6></div>
                                                    <div>{b.birdColours.map(c => (<span className="badge badge-pill me-2 mt-2"
                                                        style={{ backgroundColor: `${c}`, color: "#e8c6a2", height: "25px", fontSize: "15px" }}>{c}&nbsp;</span>))}</div>
                                                    <div><h6>Eating Habits:</h6> </div>
                                                    <div>  {b.character.eatingHabits.map(e => (<span className="badge badge-pill me-2 mt-2"
                                                        style={{ backgroundColor: `#e8c6a2`, color: "#642d3c", height: "25px", fontSize: "15px" }}>{e}&nbsp;</span>))}</div>
                                                    <br />
                                                    <div><h6>Behaviour:</h6> </div>
                                                    <div>{b.character.behaviour.map(b => (<span className="badge badge-pill me-2 mt-2"
                                                        style={{ backgroundColor: `#e8c6a2`, color: "#642d3c", height: "25px", fontSize: "15px" }}>{b}&nbsp;</span>))}</div>
                                                    <br />
                                                    <div><h6>Posted by:</h6></div>
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
                        <button className="btn btn-primary"
                                onClick={() => { this.closeModal() }}>
                                Close</button>
                        
                    </Modal.Footer>
                </Modal>


                <div style={{ height: "90px" }}></div>
            </React.Fragment>
        )
    }

}