import React, {Component} from 'react';
import axios from "axios";
import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";

import "./App.css";




class App extends Component {
  state = {
    data: [],
    name: null,
    idToDelete: null,
    loading: true,
    intervalIsSet: false,
    idToUpdate: null,
    nameToUpdate: null,
    current: ""
  };

  //! When a component mounts, first thing is to fetch all the existing data
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
    this.getDataFromDB();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDB, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  //! Get method to use our backend API and fetch data from DB
  getDataFromDB = () => {
    fetch("http://localhost:5000/getData")
      .then(data => data.json())
      .then(res => {
        this.setState({ data: res.data });
      })
      //* ALWAYS CATCH ERROR / EXCEPTIONS
      .catch(err => this.setState({ err }));
  };


  // Add Course
  addCourse = name => {
    // post method that uses our API to create new data
    axios.post("http://localhost:5000/addData", {
      name: name
    });
  };



  // delete Course
  deleteCourse = (id) => {
    console.log(id)
    axios.post("http://localhost:5000/deleteData", {
      id: id
    });
  }

  
  //editCourse
  editCourse = (id, value) => {

    axios.post("http://localhost:5000/updateData", {
          name: value,
          id: id
        });
  }

  render() {
    let { data } = this.state;
    let length = data.length;

    const courseList =
      length <= 0 ? (
        <p> Ther is no Course to show</p>
      ) : (
        data.map(data => {
          return (
            <CourseList
              deleteCourse={this.deleteCourse}
              editCourse={this.editCourse}
              name={data.name}
              id={data._id}
              key={data._id}
            />
          );
        })
      );

    return (
      <div className="App">
        <h1>Add Course</h1>
        <CourseForm
          current={this.state.current}
          name={this.state.name}
          ahmad={e => this.setState({ name: e.target.value })}
          /* updateCourse={this.updateCourse} */
          addCourse={this.addCourse}
        />
        <ul>{courseList}</ul>
      </div>
    );
  }
}

 
export default App;