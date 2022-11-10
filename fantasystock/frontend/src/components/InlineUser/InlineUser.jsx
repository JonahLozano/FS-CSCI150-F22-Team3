import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./InlineUser.css";
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

function InlineUser(props) {
  const [data, setData] = useState({
    displayName: String,
    photo: String,
    id: String,
    bio: String,
    username: String,
    activeIcon: String,
    iconList: [String],
  });
  const [show, setShow] = useState(false);

  const iconCollection = [
    { name: "crown", item: <Crown className="userIcon" /> },
    { name: "amazon", item: <Amazon className="userIcon" /> },
    { name: "apple", item: <Apple className="userIcon" /> },
    { name: "google", item: <Google className="userIcon" /> },
    { name: "ibm", item: <Ibm className="userIcon" /> },
    { name: "intel", item: <Intel className="userIcon" /> },
    { name: "meta", item: <Meta className="userIcon" /> },
    { name: "microsoft", item: <Microsoft className="userIcon" /> },
    { name: "nvidia", item: <Nvidia className="userIcon" /> },
    { name: "tesla", item: <Tesla className="userIcon" /> },
  ];

  useEffect((event) => {
    axios
      .get(`/register/${props.user}`)
      .then((response) => {
        setData({
          displayName: response.data.displayName,
          photo: response.data.photo,
          id: `#${response.data._id}`,
          bio: response.data.bio,
          username: response.data.username,
          activeIcon: response.data.activeIcon,
          icons: response.data.icons,
        });
        setShow(true);
      })
      .catch((error) => {
        setShow(false);
      });
  }, []);

  return (
    <Link
      style={{ textDecoration: "none" }}
      className={props.design}
      to={props.to}
    >
      <div
        className={`iuContainer ${props.hoverDesign}`}
        data-hover={props.hoverName}
      >
        <span className="iuIcon">
          {show &&
            iconCollection.find((ele) => ele.name === data.activeIcon).item}
        </span>
        <span className="iuUsername">{props.username}</span>
      </div>
    </Link>
  );
}

export default InlineUser;
