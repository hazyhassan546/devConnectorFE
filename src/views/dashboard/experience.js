import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
function Experience(props) {
  const renderExperiences = props.experience.map((exp) => {
    return (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide sm">{exp.title}</td>
        <td>
          <Moment format={"YYYY/MM/DD"}>{exp.from}</Moment> -
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format={"YYYY/MM/DD"}>{exp.to}</Moment>
          )}
        </td>
        <td>
          <button 
           onClick={() => {
            props.deleteExperience({
              exp_id: exp._id,
            });
          }}
          className="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
      <h2 className="my-2"> Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {renderExperiences}
        </tbody>
      </table>
    </Fragment>
  );
}

Experience.propTypes = {};

export default Experience;
