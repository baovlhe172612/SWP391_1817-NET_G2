import Swal from "sweetalert2";

export const alear_success = (title, text) => {
    Swal.fire({
        title: title,
        text: `Your file has been ${text}.`,
        icon: "success"
      });
}

export const alear_false = (title, text) => {
  Swal.fire({
      title: title,
      text: `Your file has been ${text}.`,
      icon: "error"
    });
}