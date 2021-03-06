import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../common/routes";

function ProfileItem({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) {
  return (
    <div className={"profile bg-light"}>
      <img src={SERVER_URL + avatar} alt="" className={"round-image"} />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p>
          {location} {location && <span> {location}</span>}
        </p>
        <Link to={`/profile/${_id}`} className={"btn btn-primary"}>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => {
          return (
            <li key={index} className="text-primary">
              <i className={"fas fa-check"} /> {skill}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

ProfileItem.propTypes = {};

export default ProfileItem;
