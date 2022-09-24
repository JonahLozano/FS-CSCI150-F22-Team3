import React, { useEffect, useState } from "react";
import axios from "axios";
import BtnIcons from "../../components/BtnIcon/BtnIcon";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";
import { ReactComponent as Crown } from "../../assets/crown.svg";
import { ReactComponent as Amazon } from "../../assets/amazon.svg";
import { ReactComponent as Apple } from "../../assets/apple.svg";
import { ReactComponent as Google } from "../../assets/google.svg";
import { ReactComponent as Ibm } from "../../assets/ibm.svg";
import { ReactComponent as Intel } from "../../assets/intel.svg";
import { ReactComponent as Meta } from "../../assets/meta.svg";
import { ReactComponent as Microsoft } from "../../assets/microsoft.svg";
import { ReactComponent as Nvidia } from "../../assets/nvidia.svg";
import { ReactComponent as Tesla } from "../../assets/tesla.svg";

function Profile(props) {
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

  const sendDelete = async () => {
    await axios.delete("/register/delete").catch((err) => {
      window.location.replace("http://localhost:3000");
    });
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
                <button type="button" onClick={sendDelete}>
                  Delete Account :(
                </button>
                <button type="button" onClick={sendPatch}>
                  Save :P
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h1 className="profileTitle">
                <Crown className="userIcon" />
                {data.username}
              </h1>
              <h2>{data.id}</h2>
              <p>{data.bio}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
