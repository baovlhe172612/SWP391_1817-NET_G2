export const getStatusText = (status) => {
  switch (status) {
    case 1:
      return "Done";
    case -1:
      return "Reject";
    case 0:
      return "Process";
    default:
      return "Process";
  }
};

export const getColorText = (status) => {
  switch (status) {
    case 1:
      return "green";
    case -1:
      return "red";
    case 0:
      return "gray";
    default:
      return "gray";
  }
};

export const getDateTime = (date) => {
    return date.substring(0, 16);
}
