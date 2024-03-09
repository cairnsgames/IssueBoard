import React from "react";
import { Bag, Bug, Journal, Stickies, AlignTop, Asterisk } from "react-bootstrap-icons";

export const IssueIcon = (props) => {
    const { type, size } = props;
    switch (type) {
      
      case "all":
        return <Asterisk size={size} />;
      case "bug":
        return <Bug size={size} color="red" />;
      case "task":
        return <Stickies size={size} />;
      case "story":
        return <Journal size={size} />;
      case "epic":
        return <AlignTop size={size} />;
      default:
        return <Bag size={size} />;
    }
  };