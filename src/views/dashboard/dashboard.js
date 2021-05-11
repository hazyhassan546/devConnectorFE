import React, { Fragment, useEffect } from "react";
import { globalConnect } from "../../redux/connect/globalConnect";
import Spinner from "../../components/layouts/spinner";
import { Link } from "react-router-dom";
import Experience from "./experience";
import Education from "./education";

function Dashboard(props) {
  useEffect(() => {
    props.getUserProfile();
  }, []);
  return props.profile.loading ? (
    <Spinner />
  ) : props.profile?.profile !== null ? (
    <Fragment>
      <p className="lead">
        <i className="fas fa-user">Welcome {props?.auth?.user?.name} </i>
        <div class="dash-buttons">
          <Link to="edit-profile" class="btn btn-light">
            <i class="fas fa-user-circle text-primary"></i> Edit Profile
          </Link>
          <Link to="add-experience" class="btn btn-light">
            <i class="fab fa-black-tie text-primary"></i> Add Experience
          </Link>
          <Link to="add-education" class="btn btn-light">
            <i class="fas fa-graduation-cap text-primary"></i> Add Education
          </Link>
        </div>
      </p>
      {props?.profile?.profile?.experience?.length > 0 && (
        <Experience experience={props.profile.profile.experience} {...props} />
      )}
      {props?.profile?.profile?.education?.length > 0 && (
        <Education education={props.profile.profile.education} {...props} />
      )}

      <button
        onClick={() => {
          props.deleteAccount();
        }}
        className="btn btn-danger"
      >
        <i className="fas fa-user" />
        Delete Your Account
      </button>
    </Fragment>
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {props?.auth?.user?.name}
      </p>
      <p className="my-1">You don't have setup your profile!</p>
      <Link className="btn btn-primary" to="/create-profile">
        Create Profile
      </Link>
    </Fragment>
  );
}

Dashboard.propTypes = {};

export default globalConnect()(Dashboard);
