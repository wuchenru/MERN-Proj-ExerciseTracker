import React, {Component} from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { withRouter } from "react-router";
import { useParams } from 'react-router-dom';
import { useState, setState, useEffect } from 'react';



export default function EditExercises(props) {

//         this.state = {
//             username: '',
//             description: '',
//             duration: 0,
//             date: new Date(),
//             users: [],
//         }

// or????
//  const initialState = {
//      username: '',
//      description: '',
//      duration: 0,
//      date: new Date(),
//      users: [],
//  }

    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);
    const params = useParams();

    const myRef = React.createRef();
    

     const onChangeUsername = (e) => {
        setUsername(e.target.value);
     }

     const onChangeDescription = (e) => {
        setDescription(e.target.value);
     }

     const onChangeDuration = (e) => {
        setDuration(e.target.value);
     }

     const onChangeDate = (e) => {
        console.log(e);
        setDate(e);
     }

     const onSubmit = (e) => {
        e.preventDefault();
        //e.stopPropagation();
        //e.nativeEvent.stopImmediatePropagation();

        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date,
        }

        console.log(exercise)

        axios.post('http://localhost:3000/exercises/update/' + params.id, exercise)
            .then(res => console.log(res.data));

        window.location = '/';

     }

     useEffect(() => {
        

        axios.get('http://localhost:3000/exercises/'+params.id)
        .then(res => {

            // console.log(res.data);
            setUsername(res.data.username);
            setDescription(res.data.description);
            setDuration(res.data.duration);
            setDate(new Date(res.data.date));

            // this.setState({
            //     username: res.data.username,
            //     description: res.data.description,
            //     duration: res.data.duration,
            //     date: new Date(res.data.date)

            // })
        })
        .catch(function (err) {
            console.log(err);
        })

        axios.get('http://localhost:3000/users/')
            .then(res => {
                if(res.data.length > 0) {

                    setUsers(res.data.map(user => user.username));
                    setUsername(res.data[0].username);

                    // setUsers({
                    //     users: res.data.map(user => user.username),
                    //     username: res.data[0].username
                    // });
                }
            })
        },[]);




    // return (<div>
    //     <h1>Hello, world!</h1>
    //   </div>)


    return (    
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select ref={myRef}
                        required
                        className='form-control'
                        value={username}
                        onChange={onChangeUsername}>
                        {
                            users.map( (user) => (
                                
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
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className='form-group'>
                    <label>Duration (in minutes): </label>
                    <input
                        type={"text"}
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}
                    />
                </div>
                <div className='form-group'>
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>
                <div className='form-group'>
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>

        </div>
        );

};

//  export default class EditExercises extends Component {
//     constructor(props) {
//         super(props);

//         this.onChangeUsername = this.onChangeUsername.bind(this);
//         this.onChangeDescription = this.onChangeDescription.bind(this);
//         this.onChangeDuration = this.onChangeDuration.bind(this);
//         this.onChangeDate = this.onChangeDate.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//         // this.myRef = React.createRef();

//         this.state = {
//             username: '',
//             description: '',
//             duration: 0,
//             date: new Date(),
//             users: [],
//         }
//     }

//     // run before load the page
//     // test here because eventualy we will load from the backend
//     componentDidMount() {
//         // this.setState({
//         //     users: ['test user'],
//         //     username: 'test user'
//         // })
//         // const { id } = useParams();
//         // const { exerciseId } = useParams();
        
//         axios.get('http://localhost:3000/exercises/'+this.props.match.params.id)
//             .then(res => {
//                 this.setState({
//                     username: res.data.username,
//                     description: res.data.description,
//                     duration: res.data.duration,
//                     date: new Date(res.data.date)

//                 })
//             })
//             .catch(function (err) {
//                 console.log(err);
//             })

//         axios.get('http://localhost:3000/users/')
//             .then(res => {
//                 if(res.data.length > 0) {
//                     this.setState({
//                         users: res.data.map(user => user.username),
//                         username: res.data[0].username
//                     })
//                 }
//             })
//     }

//     onChangeUsername(e) {
//         this.setState({
//             username: e.target.value,
//         })
//     }

//     onChangeDescription(e) {
//         this.setState({
//             description: e.target.value,
//         })
//     }

//     onChangeDuration(e) {
//         this.setState({
//             duration: e.target.value,
//         })
//     }

//     onChangeDate(date) {
//         this.setState({
//             date: date,
//         })
//     }

//     onSubmit = (e) => {
//         e.preventDefault();
//         //e.stopPropagation();
//         //e.nativeEvent.stopImmediatePropagation();

//         const exercise = {
//             username: this.state.username,
//             description: this.state.description,
//             duration: this.state.duration,
//             date: this.state.date,
//         }

//         console.log(exercise)

//         axios.post('http://localhost:3000/exercises/update/'+this.props.match.params.id, exercise)
//             .then(res => console.log(res.data));

//         // window.location = '/';
//     }

//     render() {
//         return (
        
//         <div>
//             <h3>Edit Exercise Log</h3>
//             <form onSubmit={this.onSubmit}>
//                 <div className="form-group">
//                     <label>Username: </label>
//                     <select ref={this.myRef}
//                         required
//                         className='form-control'
//                         value={this.state.username}
//                         onChange={this.onChangeUsername}>
//                         {
//                             this.state.users.map( (user) => (
                                
//                                 <option key={user} value={user}>
//                                     {user}
//                                 </option>
//                             ))
//                         }
//                     </select>
//                 </div>
//                 <div className='form-group'>
//                     <label>Description: </label>
//                     <input
//                         type={"text"}
//                         className="form-control"
//                         value={this.state.description}
//                         onChange={this.onChangeDescription}
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label>Duration (in minutes): </label>
//                     <input
//                         type={"text"}
//                         className="form-control"
//                         value={this.state.duration}
//                         onChange={this.onChangeDuration}
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label>Date: </label>
//                     <div>
//                         <DatePicker
//                             selected={this.state.date}
//                             onChange={this.onChangeDate}
//                         />
//                     </div>
//                 </div>
//                 <div className='form-group'>
//                     <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
//                 </div>
//             </form>

//         </div>
//         );
//     }
// }

// export default withRouter(EditExercises);