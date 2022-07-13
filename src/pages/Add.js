import React from 'react';
import axios from 'axios';
// import DatePicker from "react-datepicker";
import '../App.css';
import Select from 'react-select';
// import { AccordionCollapse } from 'react-bootstrap';
// import LocationPicker from "react-leaflet-location-picker";

const options = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'brown', label: 'Brown' },
    { value: 'white', label: 'White' },
];


export default class Add extends React.Component {

    url = "https://8000-samuelpng-tgc18project2-vk174li0pel.ws-us54.gitpod.io/"

    state = {
        data: [],
        birdSize: "",
        birdFamily: "",
        birdSpecies: "",
        dateSpotted: "",
        neighbourhoodSpotted: "",
        dateSpotted: "",
        lat: "",
        lng: "",
        imageUrl: null,
        eatingHabits: "",
        behaviour: "",
        description: "",
        birdColours: [],
        submit: false
    }

    birdFamily = {
        myArray: ["sparrow", "eagle", "raven"]
    }

    neighbourhoodSpotted = [
        {
            display: "Ang Mo Kio",
            value: "angmokio"
        },
        {
            display: "Tampines",
            value: "tampines"
        },
        {
            display: "Punggol",
            value: "punggol"
        }
    ]

    birdSize = {
        myArray: [1, 2, 3, 4, 5]
    }

    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChange = birdColours => {
        // let newArray = birdColours.map(c => c.name)
        this.setState({ birdColours: birdColours });
        console.log(`Option selected:`, newArray);
    };
    // MapSimple = () => {
    //     const [location, setLocation] = useState({
    //         lat: 51.505,
    //         lng: -0.09,
    //         zoom: 13,
    //     });

    //     const position = [location.lat, location.lng];

    //     const setMarkerPosition = e => {
    //         setLocation({ ...e.latlng, zoom: 19 });
    //         console.log(`My location is: ${JSON.stringify(e.latlng, null, 3)}`)
    //     };

    //     return (

    //         <TileLayer
    //             attribution='© OpenStreetMap contributors'
    //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //         />           
    // )

    // }

    newSighting = async () => {
        this.setState({
            submit: true
        })

        let newColors = this.state.birdColours.map(c => c.value)

        await axios.post(this.url + 'bird_sightings', {
            birdSize: parseInt(this.state.birdSize),
            birdFamily: this.state.birdFamily,
            birdSpecies: this.state.birdSpecies,
            dateSpotted: this.state.dateSpotted,
            neighbourhoodSpotted: this.state.neighbourhoodSpotted,
            dateSpotted: this.state.dateSpotted,
            // lat: this.state.lat,
            // lng: this.state.lng,
            // imageUrl: this.state.imageUrl,
            // eatingHabits: this.state.eatingHabits,
            // behaviour: this.state.behaviour,
            // description: this.state.description,
            birdColours: newColors
        })
        
    }


    render() {

        const { birdColours } = this.state;

        return (
            <React.Fragment>
                <div className="p-3 mx-3 my-4 col-sm col-md col-lg">
                    <div className="addHeader">
                        <h2 style={{ color: "#642d3c" }}>Add New Sighting</h2>
                    </div>
                    <div className="row">
                        <div>
                            <div className="label mt-3">Bird Size</div>
                            <div>small, sm, medium, ml, large</div>
                            <input type="radio" className="ms-2" name="birdSize" value="1" key="1" onChange={this.updateFormField} checked={this.state.birdSize === "1"} />
                            <input type="radio" className="ms-4" name="birdSize" value="2" key="2" onChange={this.updateFormField} checked={this.state.birdSize === "2"} />
                            <input type="radio" className="ms-4" name="birdSize" value="3" key="3" onChange={this.updateFormField} checked={this.state.birdSize === "3"} />
                            <input type="radio" className="ms-4" name="birdSize" value="4" key="4" onChange={this.updateFormField} checked={this.state.birdSize === "4"} />
                            <input type="radio" className="ms-4" name="birdSize" value="5" key="5" onChange={this.updateFormField} checked={this.state.birdSize === "5"} />
                            <input type="radio" className="ms-4" name="birdSize" value="6" key="6" onChange={this.updateFormField} checked={this.state.birdSize === "6"} />
                            <input type="radio" className="ms-4" name="birdSize" value="7" key="7" onChange={this.updateFormField} checked={this.state.birdSize === "7"} />
                        </div>
                        <div>
                            <div className="label mt-3">Bird Family</div>
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
                            <div className="label mt-3">Bird Species</div>
                            <input type="text" className="form-control"
                                name="birdSpecies" value={this.state.birdSpecies}
                                onChange={this.updateFormField} />
                        </div>
                        <div>
                            <div className="App mt-3" >
                                <label>Bird Colours</label>
                                <Select
                                    isMulti={true}
                                    value={birdColours}
                                    onChange={this.handleChange}
                                    options={options}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="label mt-3">Neighbourhood Spotted</div>
                            <select className="form-select form-control" name="neighbourhoodSpotted"
                                value={this.state.neighbourhoodSpotted} onChange={this.updateFormField}>
                                <option value="placeHolder" key="placeHolder">--Select One--</option>
                                {this.neighbourhoodSpotted.map(n =>
                                    <option key={n.value} value={n.value}>{n.display}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <div className="label mt-3">Date Spotted</div>
                            <input type="text" className="form-control" placeholder="YYYY-MM-DD"
                                name="dateSpotted" value={this.state.dateSpotted}
                                onChange={this.updateFormField} />
                        </div>
                        <div>
                            eating habits
                        </div>
                        <div>
                            behaviour
                        </div>
                        <div>
                            description
                        </div>
                        <div>
                            <button className="btn" style={{ backgroundColor: "#fff2dd", color: "#642d3c", fontWeight: "600" }}
                                onClick={this.newSighting}>Add New Sighting</button>
                        </div>
                    </div>
                </div>
                <div className="addFooter"></div>

            </React.Fragment>
        )
    }
}
