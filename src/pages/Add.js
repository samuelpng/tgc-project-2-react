import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

export default class Add extends React.Component {

    state = {
        data: [],
        birdSize: "",
        birdFamily: "",
        birdSpecies: "",

    }

    birdFamily = {
        myArray : ["sparrow", "eagle", "raven"]
    }

    neighbourhoodSpotted = {
        myArray : ["Ang Mo Kio", "Tampines", "Bedok"]
    }

    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <h2>Add New Sighting</h2>
                <div>
                    <div className="label ms-2">Bird Size</div>
                    <input type="text" className="form-control ms-2"
                        name="birdSize" value={this.birdSize}
                        onChange={this.updateFormField}
                        style={{ width: "80vw" }} />
                </div>
                <div>
                    <div className="label ms-2">Bird Family</div>
                    <select className="ms-2">
                        <option title="placeHolder" key="placeHolder">--Select One--</option>
                        {this.birdFamily.myArray.map(f => 
                            <option title={f} key={f}>{f[0].toUpperCase()+f.substring(1)}</option>
                        )}
                    </select>
                </div>
                <div>
                    <div className="label ms-2">Bird Species</div>
                    <input type="text" className="form-control ms-2"
                        name="birdSpecies" value={this.birdSpecies}
                        onChange={this.updateFormField}
                        style={{ width: "80vw" }} />
                </div>
                <div>
                    bird colours checkbox
                </div>
                <div>
                <div className="label ms-2">Neighbourhood Spotted</div>
                    <select className="ms-2">
                        <option title="placeHolder" key="placeHolder">--Select One--</option>
                        {this.neighbourhoodSpotted.myArray.map(f => 
                            <option title={f} key={f}>{f[0].toUpperCase()+f.substring(1)}</option>
                        )}
                    </select>
                </div>
                <div>
                    lat lng
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
            </React.Fragment>
        )
    }
}
