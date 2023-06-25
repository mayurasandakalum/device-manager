import { toast } from "react-hot-toast";

const Toast = (variant, message) => {
  const options = {
    style: {
      borderRadius: "10px",
      color: "#fff",
    },
    icon: "📢",
  };

  if (variant === "active") {
    options.style.background = "#B5DECA";
    options.style.color = "rgba(0, 178, 93, 1)";
  } else if (variant === "inactive") {
    options.style.background = "#FAC6C3";
    options.style.color = "rgba(244, 67, 54, 1)";
  }

  return toast(message, options);
};

export { Toast };
