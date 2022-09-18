import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        //e.stopPropagation();
        //e.nativeEvent.stopImmediatePropagation();

        const user = {
            username: this.state.username,
        }

        console.log(user);

        axios.post('http://localhost:3000/users/add', user)
            .then(res => alert(res.data));

        this.setState({
            username: ''
        })

        // window.location = '/create';
    }

    render() {
        return (
            <div>
                <h3>Create New Users</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className='form-control'
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        ></input>
                    </div>
                    
                    <input type="submit" value="Create User" className="btn btn-primary"/>
                </form>
                <p>You are on the Create Users component!</p>
            </div>
        );
    }
}