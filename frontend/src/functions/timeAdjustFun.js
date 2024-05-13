const timeAdjustFun = (date) => {
  const newDate = new Date(date);

  return {
    day: newDate.getDate(),
    month: newDate.getMonth() + 1,
    year: newDate.getFullYear(),
    hours: newDate.getHours(),
    minutes: ("0" + newDate.getMinutes().toString()).substring(
      newDate.getMinutes().toString().length - 1
    ),
  };
};
export default timeAdjustFun;
