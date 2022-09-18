import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Switch,
} from "react-router-dom";


import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";

import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component.js";
import CreateUser from "./components/create-user.component";


function App() {
  // console.log(1)
  return (
    <BrowserRouter>
      <div className='container'>
        <Navbar />
        <br/>

        {/* // console.log(<ExercisesList />) */}
        <Routes>
          <Route path = "/" element={<ExercisesList />} />
          <Route path = "/edit/:id" element = {<EditExercise />} />
          <Route path = "/create" element = {<CreateExercise />} />
          <Route path = "/user" element = {<CreateUser />} />
        </Routes>
      </div>
    </BrowserRouter>

    // <BrowserRouter>
    // <Routes>
    //   <Route path="/" element={<ExercisesList />}>
    //     {/* <Route index element={<Home />} />
    //     <Route path="teams" element={<Teams />}>
    //       <Route path=":teamId" element={<Team />} />
    //       <Route path="new" element={<NewTeamForm />} />
    //       <Route index element={<LeagueStandings />} />
    //     </Route> */}
    //   </Route>
    // </Routes>
    // </BrowserRouter>
    
  );
}

{/* <BrowserRouter>
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
</Routes>
</BrowserRouter>,
document.getElementById("root") */}

export default App;
