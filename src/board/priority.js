import {
  Circle,
  DashCircleFill,
  Icon1CircleFill,
  Icon2CircleFill,
  Icon3CircleFill,
  Icon4CircleFill,
  Icon5CircleFill,
  Icon6CircleFill,
} from "react-bootstrap-icons";

const Priority = ({ level }) => {
  if (!level) {
    return <DashCircleFill size="20" style={{ color: "grey" }} />;
  }
  const colors = ["red", "maroon", "orange", "green", "blue", "purple"];
  const icons = [
    <Icon1CircleFill size="20" style={{ color: colors[level - 1] }} />,
    <Icon2CircleFill size="20" style={{ color: colors[level - 1] }} />,
    <Icon3CircleFill size="20" style={{ color: colors[level - 1] }} />,
    <Icon4CircleFill size="20" style={{ color: colors[level - 1] }} />,
    <Icon5CircleFill size="20" style={{ color: colors[level - 1] }} />,
    <Icon6CircleFill size="20" style={{ color: colors[level - 1] }} />,
    <DashCircleFill size="20" style={{ color: "grey" }} />,
  ];


  return <div style={{ float: "right" }}>{icons[level - 1]}</div>;
};
export default Priority;
