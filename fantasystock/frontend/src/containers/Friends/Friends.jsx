import React, { useMemo, useState } from "react";
import axios from "axios";
import ClickablePic from "../../components/ClickablePic/ClickablePic";
import "./Friends.css";

function Profile(props) {
  const [data, setData] = useState([]);
  const [fr, setFr] = useState([]);
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

    axios
      .get(`/register/friendsrequests`)
      .then((response) => {
        setFr(() =>
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
        <h1>Friend Requests</h1>
        {show &&
          fr.map((ele, index) => (
            <div className="friendblock" key={`uniqueId${index}`}>
              <ClickablePic
                aSrc={ele.photo}
                design="circlePic"
                aAlt={`${ele.username}'s Profile`}
                to={`/user/${ele._id}`}
              />
              <div className="friendusername">{ele.username}</div>
              <input
                type="button"
                className="msgfriend"
                value="Accept"
                onClick={() => {
                  console.log(ele._id);

                  axios.patch("/register/friend/request/accept", {
                    friendcode: ele._id,
                  });
                }}
              />
              <input
                type="button"
                className="unfriendfriend"
                value="Reject"
                onClick={() => {
                  console.log(ele._id);

                  axios.patch("/register/friend/request/decline", {
                    friendcode: ele._id,
                  });
                }}
              />
            </div>
          ))}
        <h1>Friends</h1>
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
