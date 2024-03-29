import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';


export default class CreateExercises extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.myRef = React.createRef();

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [''],
        }
    }




    // run before load the page
    // test here because eventualy we will load from the backend
    componentDidMount() {
        // this.setState({
        //     users: ['test user'],
        //     username: 'test user'
        // })
        axios.get('http://localhost:3000/users')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value,
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date,
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        //e.stopPropagation();
        //e.nativeEvent.stopImmediatePropagation();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }

        console.log(exercise)

        axios.post('http://localhost:3000/exercises/add', exercise)
            .then(res => alert(res.data))
            .then(setTimeout( () => {
                window.location = '/'
            }, 100))

    }

    render() {
        return (

            <div>
                <h3>Create A New Exercise Log Here</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref={this.myRef}
                            required
                            className='form-control'
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map((user) => (

                                    <option key={user} value={user}>
                                        {user}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Description: </label>
                        <input
                            type={"text"}
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Duration (in minutes): </label>
                        <input
                            type={"text"}
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className='form-group'>
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>

            </div>
        );
    }
}