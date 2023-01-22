import React, { Component } from "react";
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from "../components/ErrorBoundry";
import './App.css';


class App extends Component {


    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value });
    }

    // make requests on componentDidMount
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {this.setState({ robots: users })});
    }

    render() {

        // using destructuring
        const {robots, searchField } = this.state;
        
        if (!robots.length) {
            // add loading bar here
            return <h1>Loading...</h1>
        } else {

            const filteredRobots = robots.filter(robot => {
                return robot.name.toLowerCase().includes(searchField.toLowerCase())
            });

            return (
                <div className='tc'>
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }

    }

}

export default App;