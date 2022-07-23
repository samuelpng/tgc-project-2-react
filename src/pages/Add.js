import React from 'react';
import axios from 'axios';
// import DatePicker from "react-datepicker";
import '../App.css';
import Select from 'react-select';
import sparrow from '../pictures/sparrow.png';
import blackbird from '../pictures/blackbird.png';
import crow from '../pictures/crow.png';
import goose from '../pictures/goose.png'
import kingFisher from '../pictures/addPageImg.jpeg'
import logo from '../pictures/sgbirds-logo.png';
import { IoCloseOutline } from "react-icons/io5";
import { render } from "react-dom";

const ONEMAP_BASE_API_URL = 'https://developers.onemap.sg/'

const options = [
    { value: 'black', label: 'Black', color: 'black' },
    { value: 'grey', label: 'Grey', color: 'grey' },
    { value: 'white', label: 'White', color: 'lightgrey' },
    { value: 'brown', label: 'Brown', color: 'brown' },
    { value: 'red', label: 'Red', color: 'crimson' },
    { value: 'blue', label: 'Blue', color: 'blue' },
    { value: 'green', label: 'Green', color: 'green' },
    { value: 'yellow', label: 'Yellow', color: 'goldenrod' },
    { value: 'orange', label: 'Orange', color: 'orange' }
];

const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return { ...styles, color: data.color }
    },
    multiValue: (styles, { data }) => {
        return {
            ...styles,
            backgroundColor: data.color,
            color: 'white'
        }
    },
    multiValueLabel: (styles, { data }) => {
        return {
            ...styles,
            backgroundColor: data.color,
            color: 'white'
        }
    }
}


export default class Add extends React.Component {

    url = "https://8000-samuelpng-tgc18project2-vk174li0pel.ws-us54.gitpod.io/"

    state = {
        data: [],
        birdSize: "",
        birdFamily: "",
        birdSpecies: "",
        dateSpotted: "",
        neighbourhoodSpotted: "",
        lat: "",
        lng: "",
        address: "",
        addressResults: null,
        imageUrl: "",
        eatingHabits: [],
        eatingTags: "",
        behaviour: [],
        behaviourTags: "",
        description: "",
        birdColours: [],
        displayName: "",
        email: "",
        locate: "geoLocate",
        submit: false,
        addressDiv: false
    }

    birdFamily = {
        myArray: ["chicken", "eagle", "falcon", "hawk", "hornbills", "hummingbird", "kingfisher","owl", "pigeons", "sparrow", 
        "storks", "waterfowl", "woodpeckers", "others"]
    }

    neighbourhoodSpotted = {
        myArray : ["Aljunied", "Ang Mo Kio", "Balestier", "Bartley", "Bayfront", "Beach Road", "Beauty World", "Bedok", "Bishan", "Botanic Gardens", "Braddell", "Bras Basah", "Buangkok", "Bugis", "Bukit Batok", "Bukit Giombak", "Buki Timah",
    "Buona Vista", "Changi", "Changi", "Choa Chu Kang", "City Hall", "Clementi", "Commonwealth", "Dhoby Ghaut", "Dover", "Downtown",
    "East Coast", "Eunos", "Farrer Park", "Fort Canning", "Geylang", "Great World", "Harbourfront", "Holland Village", "Hougang",
    "Jalan Besar", "Jalan Kayu", "Joo Chiat", "Jurong East", "Kallang", "Katong", "Kembangan", "Kent Ridge", "Khatib", "Kovan",
    "Lavender", "Little India", "Macpherson", "Marina Bay", "Marine Parade", "Mountbatten", "Newton", "Novena", "Orchard", "Outram Park",
    "Pasir Panjang", "Pasir Ris", "Paya Lebar", "Potong Pasir", "Punggol", "Queenstown", "Raffles Place", "Redhill", "Seletar", "Sembawang", 
    "Sengkang", "Serangoon", "Siglap", "Simei",  "Somerset", "Tai Seng", "Tampines", "Tanah Mearh", "Tanjong Katong", "Tanjong Pagar",
    "Thomson", "Tiong Bahru", "Toa Payoh", "Tuas", "West Coast", "Woodlands", "Yio Chu Kang", "Yishun"]}

    addressSearch = async (searchQuery) => {
        let response = await axios.get(ONEMAP_BASE_API_URL + `commonapi/search?searchVal=${searchQuery}&returnGeom=Y&getAddrDetails=Y&pageNum=1`)
        // this.setState({
        //     addressDiv: false
        // })
        this.setState({
            addressResults: "",
            addressResults: response.data.results,
            addressDiv: true
        })
    }

    chooseAddress = (lat, lng, address) => {
        this.setState({
            address: address,
            lat: lat,
            lng: lng,
            addressDiv: false
        })
    }

    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChange = birdColours => {
        this.setState({ birdColours: birdColours });
    };

    removeEatingTag = (e) => {
        let eatingTagArray = [
            ...this.state.eatingHabits.slice(0, e),
            ...this.state.eatingHabits.slice(e + 1)
        ];
        this.setState({ eatingHabits: eatingTagArray })
    }

    removeBehaviourTag = (b) => {
        let behaviourTagArray = [
            ...this.state.behaviour.slice(0, b),
            ...this.state.behaviour.slice(b + 1)
        ];
        this.setState({ behaviour: behaviourTagArray })
    }

    updateEatingHabits = (e) => {
        if ((e.key === 'Enter' || e.code === 'Enter') && e.target.value.trim() !== "") {
            const newArray = [...this.state.eatingHabits]
            newArray.push(e.target.value.trim())
            this.setState({ 
                eatingHabits: newArray,
                eatingTags: ""
             })
        }
    }

    updateBehaviour = (b) => {
        if ((b.key === 'Enter' || b.code === 'Enter') && b.target.value.trim() !== "") {
            const newArray = [...this.state.behaviour]
            newArray.push(b.target.value.trim())
            this.setState({ 
                behaviour: newArray,
                behaviourTags: "" 
            })
        }
    }

    newSighting = async () => {
        this.setState({
            submit: true
        })

        let newColors = this.state.birdColours.map(c => c.value)

        await axios.post(this.url + 'bird_sightings', {
            birdSize: parseInt(this.state.birdSize),
            birdFamily: this.state.birdFamily,
            birdSpecies: this.state.birdSpecies,
            birdColours: newColors,
            dateSpotted: this.state.dateSpotted,
            neighbourhoodSpotted: this.state.neighbourhoodSpotted,
            locationSpotted: {
                lat: this.state.lat,
                lng: this.state.lng
            },
            imageUrl: this.state.imageUrl,
            character: {
                eatingHabits: this.state.eatingHabits,
                behaviour: this.state.behaviour,
            },
            displayName: this.state.displayName,
            email: this.state.email
        })

    }


    userLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              let lat = position.coords.latitude
              let lng = position.coords.longitude
              
              this.setState({
               
                  lat: lat,
                  lng: lng
                
              })
            })   
    }

    render() {

        const { birdColours } = this.state;

        return (
            <React.Fragment>
               
                <div className="nonFixedHeader">
                    <img src={logo} alt="logo" height="90px" />
                </div>
                <div>
                    <img src={kingFisher} className="addImg" alt="kingfisher" width="100%" height="225px" />
                </div>
                <div className="p-3 mx-3 my-4 col-sm col-md col-lg">
                    <div className="formPadding addHeader">
                        <h2 style={{ color: "#642d3c" }}>Add New Sighting</h2>
                    </div>
                    <div className="formPadding">
                        <div>
                            <div className="label mt-3" style={{ color: "#642d3c" }}>Bird Size</div>
                            <div style={{ height: '52px' }}></div>
                            <div style={{ position: 'relative' }}>
                                <label for="1" style={{ position: 'absolute', bottom: '0', left: '5px' }}><img src={sparrow} alt="sparrow" height="15px" /></label>
                                <label for="3" style={{ position: 'absolute', bottom: '0', left: '75px' }}><img src={blackbird} alt="blackbird" height="25px" /></label>
                                <label for="5" style={{ position: 'absolute', bottom: '0', left: '143px' }}><img src={crow} alt="crow" height="35px" /></label>
                                <label for="7" style={{ position: 'absolute', bottom: '0', left: '220px' }}><img src={goose} alt="goose" height="50px" /></label>
                            </div>
                            <input type="radio" className="ms-2" name="birdSize" value="1" key="1" id="1" onChange={this.updateFormField} checked={this.state.birdSize === "1"} />
                            <input type="radio" className="ms-4" name="birdSize" value="2" key="2" id="2" onChange={this.updateFormField} checked={this.state.birdSize === "2"} />
                            <input type="radio" className="ms-4" name="birdSize" value="3" key="3" id="3" onChange={this.updateFormField} checked={this.state.birdSize === "3"} />
                            <input type="radio" className="ms-4" name="birdSize" value="4" key="4" id="4" onChange={this.updateFormField} checked={this.state.birdSize === "4"} />
                            <input type="radio" className="ms-4" name="birdSize" value="5" key="5" id="5" onChange={this.updateFormField} checked={this.state.birdSize === "5"} />
                            <input type="radio" className="ms-4" name="birdSize" value="6" key="6" id="6" onChange={this.updateFormField} checked={this.state.birdSize === "6"} />
                            <input type="radio" className="ms-4" name="birdSize" value="7" key="7" id="7" onChange={this.updateFormField} checked={this.state.birdSize === "7"} />
                        </div>
                        <div>
                            <div className="label mt-3" style={{ color: "#642d3c" }}>Bird Family</div>
                            <select className="form-select form-control" name="birdFamily"
                                value={this.state.birdFamily} onChange={this.updateFormField}>
                                <option name="birdFamily" key="placeHolder">--Select One--</option>
                                {this.birdFamily.myArray.map(f =>
                                    <option name="birdFamily" key={f} value={f} >
                                        {f[0].toUpperCase() + f.substring(1)}
                                    </option>
                                )}
                            </select>
                        </div>
                        <div>
                            <div className="label mt-3" style={{ color: "#642d3c" }}>Bird Species</div>
                            <input type="text" className="form-control"
                                name="birdSpecies" value={this.state.birdSpecies}
                                onChange={this.updateFormField} />
                        </div>
                        <div>
                            <div className="App mt-3" >
                                <label style={{ color: "#642d3c" }}>Bird Colours</label>
                                <Select
                                    isMulti={true}
                                    value={birdColours}
                                    onChange={this.handleChange}
                                    options={options}
                                    styles={colorStyles}
                                />
                            </div>
                        
                        <div>
                            <div className="label mt-3" style={{ color: "#642d3c" }}>Image Upload</div>
                            <input type="text" className="form-control"
                                name="imageUrl" value={this.state.imageUrl}
                                placeholder="Insert Image URL..."
                                onChange={this.updateFormField} />
                        </div>

                            <div className="label mt-3" style={{ color: "#642d3c" }}>Neighbourhood Spotted</div>
                            <select className="form-select form-control" name="neighbourhoodSpotted"
                                value={this.state.neighbourhoodSpotted} onChange={this.updateFormField}>
                                <option value="placeHolder" key="placeHolder">--Select One--</option>
                                {this.neighbourhoodSpotted.myArray.map(n =>
                                    <option key={n} value={n}>{n}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <div>
                                <div className="label mt-3" style={{ color: "#642d3c" }}>Location Spotted</div>
                                <input type="text" className="form-control" placeholder="Latitude"
                                    name="lat" value={this.state.lat}
                                    onChange={this.updateFormField} />
                                <input type="text" className="form-control mt-2" placeholder="Longitude"
                                    name="lng" value={this.state.lng}
                                    onChange={this.updateFormField} />
                                
                                <label className="mt-2" style={{ color: "#642d3c" }}>Retrieve latitude and longitude by :</label>
                                <div><input type="radio" id="geoLocate" name="locate" value="geoLocate" onChange={this.updateFormField} checked={this.state.locate === "geoLocate"}/>
                                <label for="geoLocate" className="ms-1 me-2">Current Location</label>
                                <input type="radio" id="addressLocate" name="locate" value="addressLocate" onChange={this.updateFormField} checked={this.state.locate === "addressLocate"}/>
                                <label for="addressLocate" className="ms-1 me-2">Address</label></div>

                            {this.state.locate === "addressLocate" ? 
                            <div>
                                <input type="text" className="form-control" placeholder="Address"
                                    name="address" value={this.state.address}
                                    onChange={this.updateFormField} onInput={() => { this.addressSearch(this.state.address) }}
                                />
                                
                                <div style={{ backgroundColor: "white", opacity: "0.8", overflowY: "scroll", maxHeight: "200px", position: "relative" }}>
                                    {
                                        this.state.addressResults != null && this.state.address !== "" && this.state.addressDiv === true
                                            ?
                                            this.state.addressResults.map(a =>
                                                <div syle={{ padding: "5px", position: "absolute" }} key={a.X}
                                                    onClick={() => { this.chooseAddress(a.LATITUDE, a.LONGITUDE, a.SEARCHVAL) }}>
                                                    {a.SEARCHVAL}</div>
                                            )
                                            :
                                            null
                                    }

                                </div>
                                </div>
                                :
                                <div>
                                    <button className="btn" style={{ backgroundColor: "#fff2dd", color: "#642d3c", fontWeight: "600", padding: "5px", borderColor: "#642d3c" }}
                                    onClick={this.userLocation}>Get My Location</button>
                                </div>
                                }       
                            </div>
                        </div>
                        <div>
                            <div className="label mt-3" style={{ color: "#642d3c" }}>Date Spotted</div>
                            <input type="text" className="form-control" placeholder="YYYY-MM-DD"
                                name="dateSpotted" value={this.state.dateSpotted}
                                onChange={this.updateFormField} />
                        </div>
                        <div>
                            <label style={{ color: "#642d3c" }} className="mt-3">Eating Habits</label>
                            <div className="mb-2">
                                {
                                    this.state.eatingHabits.map((newE, e) =>
                                    (<span key={`${newE}`} className="badge badge-pill me-2 mt-2" style={{ backgroundColor: "#fff2dd", color: "#642d3c", height: "30px", fontSize: "15px" }}>
                                        {newE}
                                        <span onClick={() => this.removeEatingTag(e)} style={{ marginLeft: "7px" }}><span style={{ fontSize: "17px" }}><IoCloseOutline /></span></span></span>)
                                    )
                                }
                            </div>
                            <input type="text" className="form-control" name="eatingTags" placeholder="Press Enter to add..." value={this.state.eatingTags} onKeyDown={this.updateEatingHabits} onChange={this.updateFormField}>
                            </input>
                        </div>
                        <div>
                            <label style={{ color: "#642d3c" }} className="mt-3">Behaviour</label>
                            <div className="mb-2">
                                {
                                    this.state.behaviour.map((newB, b) =>
                                    (<span key={`${newB}`} className="badge badge-pill me-2 mt-2" style={{ backgroundColor: "#fff2dd", color: "#642d3c", height: "30px", fontSize: "15px" }}>
                                        {newB}
                                        <span onClick={() => this.removeBehaviourTag(b)} style={{ marginLeft: "7px" }}><span style={{ fontSize: "17px" }}><IoCloseOutline /></span></span></span>)
                                    )
                                }
                            </div>
                            <input type="text" className="form-control" name="behaviourTags" placeholder="Press Enter to add..." value={this.state.behaviourTags} onKeyDown={this.updateBehaviour} onChange={this.updateFormField}>
                            </input>
                        </div>
                        <div>
                            <div className="label mt-3" style={{ color: "#642d3c" }}>Display Name</div>
                            <input type="text" className="form-control" placeholder="Name you would like to be displayed..."
                                name="displayName" value={this.state.displayName}
                                onChange={this.updateFormField} />
                        </div>
                        <div>
                            <div className="label mt-3" style={{ color: "#642d3c" }}>Email Address</div>
                            <input type="text" className="form-control" placeholder="Email address"
                                name="email" value={this.state.email}
                                onChange={this.updateFormField} />
                        </div>
                        
                        <div>
                            <button className="btn mt-3" style={{ backgroundColor: "#fff2dd", color: "#642d3c", fontWeight: "600" }}
                                onClick={this.newSighting}>Add New Sighting</button>
                        </div>
                    </div>
                </div>
                <div className="addFooter"></div>
                
            </React.Fragment>
        )
    }
}
