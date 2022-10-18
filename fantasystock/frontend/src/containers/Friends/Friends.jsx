import React, { useMemo, useState } from "react";
import axios from "axios";
import ClickablePic from "../../components/ClickablePic/ClickablePic";
import "./Friends.css";

function Profile(props) {
  const [data, setData] = useState([]);

  const [friendcode, setFriendcode] = useState("");

  useMemo((event) => {
    axios
      .get(`/register/friends`)
      .then((response) => {
        setData((prev) => {
          return [
            ...prev,
            {
              _id: response.data[0]._id,
              username: response.data[0].username,
              photo: response.data[0].photo,
            },
          ];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sendPatch = () => {
    if (data.username.length <= 32) {
      axios.patch("/register/addfriend", {
        friendcode: friendcode,
      });
    }
  };

  const editFriendcode = (e) => {
    setFriendcode(e.target.value);
  };

  return (
    <div>
      <input
        type="textbox"
        placeholder="Friend Code"
        onChange={editFriendcode}
        value={friendcode}
        className="friendadderbar"
      />
      <input
        className="friendbaradderbtn"
        type="button"
        value="Add Friend"
        onClick={sendPatch}
      />
      <div>
        {data.map((ele, index) => (
          <div className="friendblock" key={`uniqueId${index}`}>
            <ClickablePic
              aSrc={ele.photo}
              design="circlePic"
              aAlt={`${ele.username}'s Profile`}
              to={`/user/${ele._id}`}
            />
            <div className="friendusername">{ele.username}</div>
            <input type="button" className="msgfriend" value="Message" />
            <input type="button" className="unfriendfriend" value="Unfriend" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
