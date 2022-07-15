import React from 'react';
import axios, { AxiosError } from 'axios';
import '../App.css';
import logo from '../pictures/sgbirds-logo.png';
import Accordion from 'react-bootstrap/Accordion';
import sparrow from '../pictures/sparrow.png';
import blackbird from '../pictures/blackbird.png';
import crow from '../pictures/crow.png';
import goose from '../pictures/goose.png'
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
// import eagle from '../pictures/exploreImg.jpeg';
export default class Explore extends React.Component {

    url = "https://8000-samuelpng-tgc18project2-vk174li0pel.ws-us54.gitpod.io/";

    state = {
        searchInput: "",
        searchSize: [],
        searchFamily: [],
        searchNeighbourhood: [],
        searchColours: [],
        searchResults: ''
    }

    birdSize = {
        myArray: ["1", "2", "3", "4", "5", "6", "7"]
    }

    birdColours = {
        myArray: ['black', 'grey', 'white', 'brown', 'red',
            'blue', 'green', 'yellow', 'orange'],
    }

    // updateCheckboxField = (e) => {
    //     if (this.state.searchSize.includes(e.target.value)) {
    //         let indexToRemove = this.state[e.target.name].indexOf(e.target.value);

    //         let cloned = this.state[e.target.name].slice();

    //         cloned.splice(indexToRemove, 1);

    //         this.setState({
    //             [e.target.name]: cloned
    //         })
    //     } else {
    //         let cloned = this.state[e.target.name].slice();
    //         cloned.push(e.target.value)
    //         this.setState({
    //             [e.target.name]: cloned
    //         })
    //     }
    // }

    updateFormField = (e) => {
        if (e.target.type === 'checkbox') {
            if (this.state.searchSize.includes(e.target.value)) {
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


    // updateBirdColours = (e) => {
    //     if (this.state.birdColours.includes(e.target.value)) {
    //         let indexToRemove = this.state.birdColours.indexOf(e.target.value);

    //         let cloned = this.state.birdColours.slice();

    //         cloned.splice(indexToRemove, 1);

    //         this.setState({
    //             birdColours: cloned
    //         })
    //     } else {
    //         let cloned = this.state.birdColours.slice();
    //         cloned.push(e.target.value)
    //         this.setState({
    //             birdColours: cloned
    //         })
    //     }
    // }

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





    render() {
        return (
            <React.Fragment>
                <div className="nonFixedHeader">
                    <img src={logo} alt="logo" height="90px" />
                </div>
                {/* <div>
                    <img src={eagle} className="addImg" alt="eagle" width="100%" height="225px" />
                </div> */}
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
                                                            <span>
                                                                <label for={c} className="me-1">{c[0].toUpperCase() + c.substring(1)}</label>
                                                                <input type="checkbox" value={c} key={c} id={c}
                                                                    onChange={this.updateFormField} className="me-3" name="searchColours"
                                                                    checked={this.state.searchColours.includes(`${c}`)} />
                                                            </span>
                                                        )}
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                    <div>
                                        {/* <div>
                                            <h6>Tags</h6>
                                            {this.birdColours.myArray.map(t => (
                                                <React.Fragment>
                                                    <input name="birdColours" type="checkbox" className="form-check-input" value={t} checked={this.state.birdColours.includes(`${t}`)} onChange={this.updatebirdColours} />
                                                    <label for="tags" className="form-check-label">{t}</label>
                                                </React.Fragment>

                                            ))}
                                        </div> */}
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