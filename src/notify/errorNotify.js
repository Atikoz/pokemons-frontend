import { Bounce, toast } from "react-toastify";

// autoClose false or ms

const errorNotify = (text, autoClose) => toast.error(text, {
  position: "top-right",
  autoClose: autoClose,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
});

export default errorNotify;