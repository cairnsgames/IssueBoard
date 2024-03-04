import React from "react";
import { Bag, Bug, Journal, Stickies, AlignTop } from "react-bootstrap-icons";

export const IssueIcon = (props) => {
  const { type, size } = props;
  switch (type) {
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

export const colorToRGB = (str) => {
  // returns the color from any string color value
  var ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = str;
  return ctx.fillStyle;
};

const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const newShade = (hexColor, magnitude) => {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor >> 8) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = (decimalColor & 0x0000ff & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return rgbToHex(r, g, b);
  } else {
    return hexColor;
  }
};

export const getTextColor = (bgColor) => {
  const lightColor = "white";
  const darkColor = "black";
  var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
};
