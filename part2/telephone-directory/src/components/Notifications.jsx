const Notifications = ({ message }) => {
  if (!message) return null;

  const [type, text] = message.split(":");

  if (type === "success") {
    return <div className="success">{text}</div>;
  } else if (type === "error") {
    return <div className="error">{text}</div>;
  } else if (type === "update") {
    return <div className="update">{text}</div>;
  }
};

export default Notifications;
