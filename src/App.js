/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import API from "./utils/API";

import "./App.css";

class App extends React.Component {
    
    // eslint-disable-next-line react/state-in-constructor
    state = {
        allEmployees: [],
        employees: [],
        isLoading: true,
    };
    

    componentDidMount() {
        API.fetchUsers().then((employees) => {
            this.setState({
                employees,
                allEmployees: employees,
                isLoading: false,
            });
        });
    }

    filter = (event) => {
        const gender = event.target.value;
        const { allEmployees } = this.state;

        if (gender === "all") {
            // set employees to allEmployees
            this.setState({
                employees: allEmployees,
            });
        } else {
            this.setState({
                // filter by gender
                employees: allEmployees.filter((employee) => {
                    if (employee.gender === gender) {
                        return true;
                    }
                    return false;
                }),
            });
        }
    };

    sort = (event) => {
        const name = event.target.value;

        if (name === "name") {
            const { employees } = this.state;
            this.setState({
                employees: employees.sort((employee1, employee2) => {
                    if (employee1.name < employee2.name) {
                        return -1;
                    }
                    if (employee1.name > employee2.name) {
                        return 1;
                    }
                    return 0;
                }),
            });
        }
        if (name === "location") {
            const { employees } = this.state;
            this.setState({
                employees: employees.sort((location1, location2) => {
                    if (location1.location < location2.location) {
                        return -1;
                    }
                    if (location1.location > location2.location) {
                        return 1;
                    }
                    return 0;
                }),
            });
        }
    };

    render() {
        const { isLoading, employees } = this.state;

        if (isLoading) {
            return <div />;
        }

        return (
            <>
            <header className="App-header my-4 block text-gray-700 text-center bg-gray-400 px-4 py-2">
                <p>
                    Employee Directory
                </p>
                </header>
            <div className="App">
                <div className="container mx-auto">
                <label className="text-lg text-gray-700 text-center px-4 py-2 m-2">Filter By:</label>
                <select className="text-gray-700 text-center bg-gray-200 px-4  m-2" onChange={this.filter}>
                    <option value="all">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label className="text-lg text-gray-700 text-center px-4 py-2 m-2" >Sort Alphabetically By:</label>
                <select className="text-gray-700 text-center bg-gray-200 px-4  m-2" onChange={this.sort}>
                    <option value="name">Name</option>
                    <option value="location">Location</option>
                </select>
                </div>
                <br />
                </div>
                <div className="container mx-auto block text-gray-700 text-center bg-gray-400">
                <table className="container mx-auto px-4">
                    <thead>
                        <th className="text-2xl">&#128526;</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Location</th>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr>
                                <td>
                                    <img src={employee.image} />
                                </td>
                                <td>{employee.name}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.email}</td>
                                <td>{employee.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                <footer className="my-4 block text-gray-700 text-center bg-gray-400 px-4 py-2">&copy; Mark Kelly</footer>
            </>
        );
    }
}

export default App;
