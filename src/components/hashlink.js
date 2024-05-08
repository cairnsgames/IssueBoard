const HashLink = (props) => {
  const onClick = (e) => {
    e.preventDefault();
    window.location.hash = props.href ?? "";
    if (props.onClick) {
      props.onClick(e);
    }
  };
  return (
    <button className={`hashlink ${props.className}`} onClick={onClick}>
      {props.children}
    </button>
  );
};

export default HashLink;
