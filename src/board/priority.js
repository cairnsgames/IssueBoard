import {
  Circle,
  Icon1CircleFill,
  Icon2CircleFill,
  Icon3CircleFill,
  Icon4CircleFill,
  Icon5CircleFill,
  Icon6CircleFill,
} from "react-bootstrap-icons";

const Priority = ({ level }) => {
  if (!level) {
    return null;
  }
  const colors = ["red", "maroon", "orange", "green", "blue", "purple"];
  const icons = [
    <Icon1CircleFill style={{ color: colors[level - 1] }} />,
    <Icon2CircleFill style={{ color: colors[level - 1] }} />,
    <Icon3CircleFill style={{ color: colors[level - 1] }} />,
    <Icon4CircleFill style={{ color: colors[level - 1] }} />,
    <Icon5CircleFill style={{ color: colors[level - 1] }} />,
    <Icon6CircleFill style={{ color: colors[level - 1] }} />,
  ];

  return <div style={{ float: "right" }}>{icons[level - 1]}</div>;
};
export default Priority;
