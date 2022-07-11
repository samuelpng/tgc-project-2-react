import React from 'react'

export default class Add extends React.Component {

    state = {
        data: [],
        birdSize: "",
        birdFamily: ""
    }

    birdFamily = {
        myArray : ["sparrow", "eagle", "raven"]
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
                    <div className="label">Bird Size</div>
                    <input type="text" className="form-control"
                        name="birdSize" value={this.birdSize}
                        onChange={this.updateFormField}
                        style={{ width: "80vw" }} />
                </div>
                <div>
                    <div className="label">Bird Family</div>
                    {/* <div className="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Select One
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item">Sparrow</a></li>
                            <li><a class="dropdown-item">Eagle</a></li>
                            <li><a class="dropdown-item">Raven</a></li>
                        </ul>
                    </div> */}
                    <select>
                        {this.birdFamily.myArray.map(f => 
                            <option title={f} key={f}>{f[0].toUpperCase()+f.substring(1)}</option>
                        )}
                    </select>
                </div>
            </React.Fragment>
        )
    }
}
