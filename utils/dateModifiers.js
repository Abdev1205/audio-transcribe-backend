const dateModifiers = (currentDate) => {
  const date = new Date(currentDate);
  const formattedDate = date.toLocaleString(); // This includes both date and time
  return formattedDate;
};


module.exports = { dateModifiers };