

let hour = new Date().getHours()
const colorBasedOnTime = () => {
  const colors = [
    "#05004e", // 00:00
    "#15085f", // 01:00
    "#252e6b", // 02:00
    "#31668a", // 03:00
    "#3c8dad", // 04:00
    "#4eb3d3", // 05:00
    "#75c6c0", // 06:00
    "#9fd4b4", // 07:00
    "#c5e5af", // 08:00
    "#e3e0a1", // 09:00
    "#dbcf8f", // 10:00
    "#ffcd81", // 11:00
    "#ff9e5f", // 12:00
    "#ff6c5c", // 13:00
    "#f83f59", // 14:00
    "#cc2a56", // 15:00
    "#9c1e53", // 16:00
    "#6e154f", // 17:00
    "#470b45", // 18:00
    "#310a3d", // 19:00
    "#22082f", // 20:00
    "#19062a", // 21:00
    "#0f031c", // 22:00
    "#000000", // 23:00
  ]
  return colors[hour]
}

const handleGreetings = () => {
  if (hour >= 0 && hour < 12) {
    return "Good Morning,"
  } else if (hour >= 12 && hour < 18) {
    return "Good Afternoon,"
  } else {
    return "Good Evening,"
  }
}

export {colorBasedOnTime, handleGreetings }