import React, { useMemo, useState } from "react";
import axios from "axios";
import ClickablePic from "../../components/ClickablePic/ClickablePic";
import "./Friends.css";

function Profile(props) {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const [friendcode, setFriendcode] = useState("");

  useMemo((event) => {
    axios
      .get(`/register/friends`)
      .then((response) => {
        setData(() =>
          response === undefined || response.data === undefined
            ? []
            : response.data
        );
        setShow(true);
      })
      .catch((error) => {
        setShow(false);
        console.log(error);
      });
  }, []);

  const addFriend = () => {
    console.log(friendcode);
    axios.patch("/register/addfriend", {
      friendcode: friendcode,
    });
  };

  const deleteFriend = (aFriendCode) => {
    axios.patch("/register/deletefriend", {
      friendcode: aFriendCode,
    });
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
        onClick={addFriend}
      />
      <div>
        {show &&
          data.map((ele, index) => (
            <div className="friendblock" key={`uniqueId${index}`}>
              <ClickablePic
                aSrc={ele.photo}
                design="circlePic"
                aAlt={`${ele.username}'s Profile`}
                to={`/user/${ele._id}`}
              />
              <div className="friendusername">{ele.username}</div>
              <input type="button" className="msgfriend" value="Message" />
              <input
                type="button"
                className="unfriendfriend"
                value="Unfriend"
                onClick={() => deleteFriend(ele._id)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Profile;
