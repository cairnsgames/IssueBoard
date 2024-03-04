import React, { useState, useEffect, useRef } from "react";
import { CompactPicker } from "react-color";
import { Overlay, Tooltip } from "react-bootstrap";

export const StandardPalette = [
    "#4D4D4D",
    "#999999",
    "#FFFFFF",
    "#F44E3B",
    "#FE9200",
    "#FCDC00",
    "#DBDF00",
    "#A4DD00",
    "#68CCCA",
    "#73D8FF",
    "#AEA1FF",
    "#FDA1FF",
    "#333333",
    "#808080",
    "#cccccc",
    "#D33115",
    "#E27300",
    "#FCC400",
    "#B0BC00",
    "#68BC00",
    "#16A5A5",
    "#009CE0",
    "#7B64FF",
    "#FA28FF",
    "#000000",
    "#666666",
    "#B3B3B3",
    "#9F0500",
    "#C45100",
    "#FB9E00",
    "#808900",
    "#194D33",
    "#0C797D",
    "#0062B1",
    "#653294",
    "#AB149E",
  ]

  export const BrightPalette = [
    "#ff0000",
    "#ee0000",
    "#dd0000",
    "#cc0000",
    "#bb0000",
    "#aa0000",
    "#990000",
    "#880000",
    "#ff0088",
    "#ff00aa",
    "#ffaa00",
    "#ff8800",
    "#00ff00",
    "#00ee00",
    "#00dd00",
    "#00cc00",
    "#00bb00",
    "#00aa00",
    "#009900",
    "#008800",
    "#00ff88",
    "#00ffaa",
    "#88ff00",
    "#aaff00",
    "#0000ff", 
    "#0000ee",
    "#0000dd",
    "#0000cc",
    "#0000bb",
    "#0000aa",
    "#000099",
    "#000088",
    "#00ff88",
    "#00ffaa",
    "#88ff00",
    "#aaff00",
  ]  

  export const PastelPalette = [
    "#FFB6C1", // LightPink
    "#FFD700", // Gold
    "#FFA07A", // LightSalmon
    "#FF69B4", // HotPink
    "#FFE4C4", // Bisque
    "#FF6347", // Tomato
    "#FFC0CB", // Pink
    "#FF8C00", // DarkOrange
    "#20B2AA", // LightSeaGreen
    "#FF1493", // DeepPink
    "#00CED1", // DarkTurquoise
    "#F08080", // LightCoral
    "#FFFFE0", // LightYellow
    "#40E0D0", // Turquoise
    "#F0E68C", // Khaki
    "#DDA0DD", // Plum
    "#32CD32", // LimeGreen
    "#FAFAD2", // LightGoldenrodYellow
    "#6495ED", // CornflowerBlue
    "#66CDAA", // MediumAquaMarine
    "#87CEFA", // LightSkyBlue
    "#FF4500", // OrangeRed
    "#4682B4", // SteelBlue
    "#9ACD32", // YellowGreen
    "#87CEEB", // SkyBlue
    "#AFEEEE", // PaleTurquoise
    "#7B68EE", // MediumSlateBlue
    "#778899", // LightSlateGray
    "#00FF7F", // SpringGreen
    "#20B288", // LightSeaGreen
    "#B0E0E6", // PowderBlue
    "#AFEEAA", // PaleTurquoise
    "#9370DB", // MediumPurple
    "#8FBC8F", // DarkSeaGreen
    "#FFFAF0", // FloralWhite
]

export const BlueGreenPurplePalette = [
    "#FF0000", // Red
    "#DC143C", // Crimson
    "#B22222", // FireBrick
    "#8B0000", // DarkRed
    "#FF6347", // Tomato
    "#FF4500", // OrangeRed
    "#FF7F50", // Coral
    "#FF8C00", // DarkOrange
    "#CD5C5C", // IndianRed
    "#FFA07A", // LightSalmon
    "#DB7093", // PaleVioletRed
    "#FF69B4", // HotPink
    "#8A2BE2", // BlueViolet
    "#4B0082", // Indigo
    "#483D8B", // DarkSlateBlue
    "#4169E1", // RoyalBlue
    "#0000FF", // Blue
    "#1E90FF", // DodgerBlue
    "#00BFFF", // DeepSkyBlue
    "#87CEEB", // SkyBlue
    "#87CEFA", // LightSkyBlue
    "#00CED1", // DarkTurquoise
    "#4682B4", // SteelBlue
    "#5F9EA0", // CadetBlue
    "#6495ED", // CornflowerBlue
    "#00FFFF", // Aqua
    "#00FFFF", // Cyan
    "#20B2AA", // LightSeaGreen
    "#40E0D0", // Turquoise
    "#48D1CC", // MediumTurquoise
    "#5F9EA0", // CadetBlue
    "#7FFFD4", // Aquamarine
    "#66CDAA", // MediumAquaMarine
    "#00FF7F", // SpringGreen
    "#20B2AA", // LightSeaGreen
    "#2E8B57", // SeaGreen
 ]

 export const BrightPalette2 = [
    "#FFD700", // Gold
     "#FF8C00", // DarkOrange
     "#FF4500", // OrangeRed
     "#FF6347", // Tomato
     "#FF69B4", // HotPink
     "#FF1493", // DeepPink
     "#FF00FF", // Magenta
     "#BA55D3", // MediumOrchid
     "#8A2BE2", // BlueViolet
     "#4B0082", // Indigo
     "#00FFFF", // Cyan
     "#00CED1", // DarkTurquoise
     "#00BFFF", // DeepSkyBlue
     "#00FF00", // Lime
     "#32CD32", // LimeGreen
     "#7CFC00", // LawnGreen
     "#ADFF2F", // GreenYellow
     "#7FFF00", // Chartreuse
     "#FFFF00", // Yellow
     "#FFD700", // Gold
     "#FFA500", // Orange
     "#FF6347", // Tomato
     "#FF69B4", // HotPink
     "#FF1493", // DeepPink
     "#FF00FF", // Magenta
     "#BA55D3", // MediumOrchid
     "#8A2BE2", // BlueViolet
     "#4B0082", // Indigo
     "#00FFFF", // Cyan
     "#00CED1", // DarkTurquoise
     "#00BFFF", // DeepSkyBlue
     "#00FF00", // Lime
     "#32CD32", // LimeGreen
     "#7CFC00", // LawnGreen
     "#ADFF2F", // GreenYellow
     "#7FFF00", // Chartreuse
 ]

const ColorPicker = (props) => {
  const { value, onChange, palette = BrightPalette2 } = props;
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const change = (val) => {
    setShow(false);
    onChange(val.hex);
  };

  return (
    <div
      className="form-control colorpicker"
      ref={target}
      style={{
        width: "100%",
        minHeight: "38px",
        backgroundColor: value ?? "white",
      }}
      onClick={() => setShow(!show)}
    >
      <Overlay target={target.current} show={show} placement="top">
        <Tooltip
          className="colorpicker"
          id="overlay-example"
          {...props}
          style={{ maxWidth: "275px" }}
        >
          <CompactPicker
            colors={palette}
            color={value}
            onChangeComplete={change}
          />
        </Tooltip>
      </Overlay>
    </div>
  );
};

export default ColorPicker;
