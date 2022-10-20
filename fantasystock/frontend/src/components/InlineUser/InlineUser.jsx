import React from "react";
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
  const iconCollection = [
    { name: "Crown", item: <Crown className="userIcon" /> },
    { name: "Amazon", item: <Amazon className="userIcon" /> },
    { name: "Apple", item: <Apple className="userIcon" /> },
    { name: "Google", item: <Google className="userIcon" /> },
    { name: "Ibm", item: <Ibm className="userIcon" /> },
    { name: "Intel", item: <Intel className="userIcon" /> },
    { name: "Meta", item: <Meta className="userIcon" /> },
    { name: "Microsoft", item: <Microsoft className="userIcon" /> },
    { name: "Nvidia", item: <Nvidia className="userIcon" /> },
    { name: "Tesla", item: <Tesla className="userIcon" /> },
  ];
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
          {iconCollection.find((ele) => ele.name === "Crown").item}
        </span>
        <span className="iuUsername">{props.username}</span>
      </div>
    </Link>
  );
}

export default InlineUser;
