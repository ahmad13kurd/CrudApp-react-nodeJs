import React, { Component, Fragment } from 'react';
import "../App.css";
class CourseList extends Component {

    state ={
        isEdit : false,
        courseName: '',
        id: ''
    }

    // render Course
    renderCourse = (props)=>{
        //console.log(this.props.name)
        return (
            <li className="elements">
                <span>{this.props.name}</span>
                <button onClick={()=>{this.toggleState(this.props.id)}} className="btn">Edit Course</button>
                <button className="btn" onClick={()=> {this.props.deleteCourse(this.props.id)}}>Delete</button>
            </li>      
        )
    }


    // toggleState
    toggleState = (id) => {
        let {isEdit} = this.state;
        this.setState({
            isEdit: !isEdit,
            id: id
        })
    }


    // updateCourseItem
    updateCourseItem = (e)=> {
        e.preventDefault();
        this.props.editCourse(this.state.id, this.input.value );
        this.toggleState();
    }

    // render Update Form
    renderUpdateForm = ()=>{
        return (
          <form onSubmit={this.updateCourseItem} className="btn">
            <input ref={(v) => {this.input = v}} type="text" defaultValue={this.props.name} />
            <button> Update Course</button>
          </form>
        );
  }

 

    
    render() { 

        let {isEdit} = this.state;

        return(
           <Fragment>
               { isEdit ? this.renderUpdateForm() : this.renderCourse()}
           </Fragment>
        )
    }
}
 
export default CourseList;