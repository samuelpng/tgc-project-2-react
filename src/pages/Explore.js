import React from 'react';
import axios, { AxiosError } from 'axios';
import '../App.css';
import logo from '../pictures/sgbirds-logo.png';
import Accordion from 'react-bootstrap/Accordion';
import sparrow from '../pictures/sparrow.png';
import blackbird from '../pictures/blackbird.png';
import crow from '../pictures/crow.png';
import goose from '../pictures/goose.png'
import eagle from '../pictures/exploreImg.jpeg';
export default class Explore extends React.Component {

    url = "https://8000-samuelpng-tgc18project2-vk174li0pel.ws-us54.gitpod.io/";

    state = {
        searchInput: "",
        birdSize: [],
        searchFamily: [],
        searchNeighbourhood: [],
        searchColours: [],
        searchResults: ''
    }

    birdSize = {
        myArray: ["1", "2", "3", "4", "5", "6", "7"]
    }

    updatebirdSize = (e) => {
        if (this.state.birdSize.includes(e.target.value)) {
            let indexToRemove = this.state.birdSize.indexOf(e.target.value);

            let cloned = this.state.birdSize.slice();

            cloned.splice(indexToRemove, 1);

            this.setState({
                birdSize: cloned
            })
        } else {
            let cloned = this.state.birdSize.slice();
            cloned.push(e.target.value)
            this.setState({
                birdSize: cloned
            })
        }
    }

    searchResults = async () => {
        let response = await axios.get(this.url + '/bird_sightings/search', {
            params: {
                searchQuery: this.state.searchInput
            }
        })
        this.setState({
            searchResults: response.data
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
                <div className="nonFixedHeader">
                    <img src={logo} alt="logo" height="90px" />
                </div>
                <div>
                    <img src={eagle} className="addImg" alt="kingfisher" width="100%" height="225px" />
                </div>
                <div className="p-3 mx-3 my-4 col-sm col-md col-lg">
                    <div className="addHeader">
                        <h2 style={{ color: "#642d3c" }} className="mb-3">Explore</h2>
                    </div>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><span style={{ color: "#642d3c" }}>Search</span></Accordion.Header>
                            <Accordion.Body>
                                <form className="row search-form">
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
                                                onChange={this.updatebirdSize} className="me-4"
                                                checked={this.state.birdSize.includes(`${s}`)} />)}
                                    </div>
                                </form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </React.Fragment>
        )
    }

}