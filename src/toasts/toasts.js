import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useToasts } from "../provider/usetoasts";

function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return "Just now";
}

function Toasts() {
  const { toasts, closeToast } = useToasts();
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        minWidth: "50%",
        minHeight: "240px",
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <ToastContainer
        position="bottom-end"
        className="p-3"
        style={{ zIndex: 100 }}
      >
        {toasts.map((t) => (
          <Toast
            key={t.id}
            onClose={() => closeToast(t.id)}
            show={true}
            bg={t.variant}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{t.title}</strong>
              {t.showTime && (
                <small className="text-muted">{timeAgo(t.time)}</small>
              )}
            </Toast.Header>
            <Toast.Body>{t.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </div>
  );
}

export default Toasts;
