import Swal from "sweetalert2";

export const alear_success = (title, text) => {
  Swal.fire({
    title: title,
    text: `Your file has been ${text}.`,
    icon: "success",
    timer: 1500,
  });
};

export const alear_false = (title, text) => {
  Swal.fire({
    title: title,
    text: `Your file has been ${text}.`,
    icon: "error",
    timer: 1500,
  });
};

export const alear_success_login = async (title, name) => {
  await Swal.fire({
    title: title,
    text: `Chào bạn ${name}.`,
    icon: "success",
    timer: 1500,
  });
};
