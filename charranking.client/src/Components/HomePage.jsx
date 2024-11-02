import React, { Component } from 'react';
import { GetUserId } from "./Authentication/AuthorizeView.jsx";

export class HomePage extends Component {
    static displayName = HomePage.name;

    constructor(props) {
        super(props);
        this.state = { message: '' }; // Initialize state
        this.addRankingData = this.addRankingData.bind(this); // Bind the method to this
    }
    addRankingData() {
        // Send post request with the user id
        fetch(`rankings/${GetUserId()}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Parse JSON if the request is successful
                } else {
                    throw new Error('Request failed with status ' + response.status);
                }
            })
            .then(data => {
                this.setState({
                    message: 'Request completed successfully!',
                    responseData: data // Optionally store the response data
                });
            })
            .catch(error => {
                this.setState({ message: 'Error: ' + error.message }); // Handle any network or parsing errors
            });
    }

    render() {

        localStorage.setItem('UserId', GetUserId());

        const { message } = this.state;

        return (
            <div>
                <h1>Welcome to the <b>Character Ranking App!</b></h1>

                <p>If this is your first time here, <br />
                    click on the green button below to populate ranking data:</p>

                <center>
                    <button onClick={this.addRankingData} className="save" style={{ "marginTop": "10px" }}>
                        <span className="text">Populate Ranking Data</span>
                    </button>
                </center>
                {message && <p>{message}</p>}
                <br />

                <p>This will allow you to start ranking characters as you like and save your data. <br />
                    <em>(Make sure to click on the <b>save button</b> to save the changes!)</em></p>

                <br></br>

                <p><b>Note:</b> If there will be new characters added later to the app, <br />
                    you will have to click on the green button again to start ranking them too <br />
                    (this will not affect your other characters ranking up to that point so do not worry)</p>

                <br></br>

                <p><b>Here are the series available for character ranking right now:</b></p>
                <ul style={{ textAlign: "center", listStylePosition: "inside", paddingRight: "50px" }}>
                    <li><a href='/rank-op'>One Piece</a></li>
                    <li><a href='/rank-db'>Dragon Ball</a></li>
                </ul>
                <p>(You can also access them at the navigation menu at the top of the page, <br />
                    and then click <b>Home</b> to return here.)</p>

                <p>Have fun!</p>
            </div>
        );
    }
}

export default HomePage;
