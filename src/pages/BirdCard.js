import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

export default function BirdCard(props) {
    props.loginData.map(b => (
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