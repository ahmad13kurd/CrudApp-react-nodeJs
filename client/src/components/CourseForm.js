import React from 'react';

const CourseForm = (props)=>{
    return (
      <form onSubmit={props.addCourse}>
        <input type="text" onChange={props.ahmad} required />
        <button type="submit" onClick={() => props.addCourse(props.name)} >Add Course</button>
      </form>
    );
}

export default CourseForm;