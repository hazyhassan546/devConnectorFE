import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { globalConnect } from "../../redux/connect/globalConnect";
import Spinner from "../../components/layouts/spinner";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ENDPOINTS } from "../../common/routes";
function EditProfile(props) {
  let history = useHistory();
  let loading = props?.profile?.loading;
  let profile = props?.profile?.profile;
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: [], // comma separated array
    bio: "",
    githubUserName: "",
    experience: [], // array
    education: [], // array
    youtube: "",
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: "",
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    props.getUserProfile();
  }, []);
  useEffect(() => {
    console.log(profile);
    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      githubUserName:
        loading || !profile.githubUserName ? "" : profile.githubUserName,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile?.social?.twitter,
      facebook: loading || !profile.social ? "" : profile?.social?.facebook,
      instagram: loading || !profile.social ? "" : profile?.social?.instagram,
      linkedin: loading || !profile.social ? "" : profile?.social?.linkedin,
      youtube: loading || !profile.social ? "" : profile?.social?.youtube,
    });
  }, [loading]);

  const selectImage = (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    props.uploadProfileImage(formData);
  };
  const submitForm = (e) => {
    e.preventDefault();
    props.createOrUpdateProfile({ formData, history, edit: true });
  };
  const {
    company,
    website,
    location,
    status,
    skills, // comma separated array
    bio,
    githubUserName,
    experience, // array
    education, // array
    youtube,
    twitter,
    facebook,
    instagram,
    linkedin,
  } = formData;

  return props.profile.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section class="container">
        <h1 class="large text-primary">Edit Your Profile</h1>
        {/* <p class="lead">
          <i class="fas fa-user"></i> Let's get some information to make your
          profile stand out
        </p> */}
        {/* <small>* = required field</small> */}
        <label for="favcolor">Change Profile Image : </label>
        <input
          type="file"
          class="btn btn-primary my-1"
          onChange={(e) => {
            selectImage(e);
          }}
        />
        <form
          class="form"
          onSubmit={(e) => {
            submitForm(e);
          }}
        >
          <div class="form-group">
            <select name="status" value={status} onChange={(e) => onChange(e)}>
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small class="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={(e) => onChange(e)}
            />
            <small class="form-text">
              Could be your own company or one you work for
            </small>
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              onChange={(e) => onChange(e)}
              value={website}
            />
            <small class="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              onChange={(e) => onChange(e)}
              value={location}
            />
            <small class="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              onChange={(e) => onChange(e)}
              value={skills}
            />
            <small class="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubUserName"
              onChange={(e) => onChange(e)}
              value={githubUserName}
            />
            <small class="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div class="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              onChange={(e) => onChange(e)}
              value={bio}
            ></textarea>
            <small class="form-text">Tell us a little about yourself</small>
          </div>

          <div class="my-2">
            <button type="button" class="btn btn-light">
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          <div class="form-group social-input">
            <i class="fab fa-twitter fa-2x"></i>
            <input
              type="text"
              placeholder="Twitter URL"
              name="twitter"
              onChange={(e) => onChange(e)}
              value={twitter}
            />
          </div>

          <div class="form-group social-input">
            <i class="fab fa-facebook fa-2x"></i>
            <input
              type="text"
              placeholder="Facebook URL"
              name="facebook"
              onChange={(e) => onChange(e)}
              value={facebook}
            />
          </div>

          <div class="form-group social-input">
            <i class="fab fa-youtube fa-2x"></i>
            <input
              type="text"
              placeholder="YouTube URL"
              name="youtube"
              onChange={(e) => onChange(e)}
              value={youtube}
            />
          </div>

          <div class="form-group social-input">
            <i class="fab fa-linkedin fa-2x"></i>
            <input
              type="text"
              placeholder="Linkedin URL"
              name="linkedin"
              onChange={(e) => onChange(e)}
              value={linkedin}
            />
          </div>

          <div class="form-group social-input">
            <i class="fab fa-instagram fa-2x"></i>
            <input
              type="text"
              placeholder="Instagram URL"
              name="instagram"
              onChange={(e) => onChange(e)}
              value={instagram}
            />
          </div>
          <input type="submit" class="btn btn-primary my-1" />
          <Link class="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
}

EditProfile.propTypes = {};

export default globalConnect()(EditProfile);
