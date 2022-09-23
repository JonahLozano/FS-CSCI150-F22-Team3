import React, { useEffect, useState } from "react";
import axios from "axios";
import BtnIcons from "../../components/BtnIcon/BtnIcon";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";

function Stock(props) {
  const [data, setData] = useState({
    displayName: String,
    photo: String,
    id: String,
    bio: String,
    username: String,
  });
  const [show, setShow] = useState(false);
  const [editable, setEditable] = useState(false);

  useEffect((event) => {
    axios
      .get(`/register/profile`)
      .then((response) => {
        setData({
          displayName: response.data.displayName,
          photo: response.data.photo,
          id: `#${response.data._id}`,
          bio: response.data.bio,
          username: response.data.username,
        });
        setShow(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        setShow(false);
      });
  }, []);

  const sendPatch = () => {
    axios.patch("/register/edit", {
      username: data.username,
      bio: data.bio,
    });
    toggleEdit();
  };

  const toggleEdit = () => setEditable(!editable);

  const editUsername = (e) =>
    setData((prev) => ({ ...prev, username: e.target.value }));

  const editBio = (e) => setData((prev) => ({ ...prev, bio: e.target.value }));

  return (
    <div>
      {show && (
        <div>
          <span className="editBtn">
            <BtnIcons
              icon={faPencil}
              name=""
              design="VerticalNavbarIcons2"
              onClick={toggleEdit}
            />
          </span>
          <div>
            <div className="profilePic">
              <img
                src={data.photo}
                referrerPolicy="no-referrer"
                alt="profile"
              />
            </div>
          </div>
          {editable ? (
            <form>
              <div>
                <input
                  type="textbox"
                  placeholder="Username"
                  onChange={editUsername}
                  text={data.username}
                />
              </div>
              <div>
                <textarea
                  rows="4"
                  cols="50"
                  placeholder="Bio"
                  onChange={editBio}
                  text={data.bio}
                ></textarea>
              </div>
              <div>
                <button type="button" onClick={sendPatch}>
                  Save :P
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h1 className="profileTitle">{data.username}</h1>
              <h2>{data.id}</h2>
              <p>{data.bio}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Stock;
