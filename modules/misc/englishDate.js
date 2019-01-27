module.exports = input => {

    //Create date object
    let date = new Date(input.toString());

    //Check if valid
    if (date.toString() === "Invalid Date") throw new Error("Invalid Date");

    //Process
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()];
    let dateNumber = date.getDate();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (minute < 10) minute = `0${minute}`;
    let second = date.getSeconds();
    if (second < 10) second = `0${second}`;
    let amPm = hour < 12 ? "AM" : "PM";
    if (amPm === "PM") hour = hour - 12;
    if (hour === 0) hour = 12;

    //Return
    return `${day}, ${month} ${dateNumber}, ${year} at ${hour}:${minute}:${second} ${amPm} (GMT+0000, UTC)`;
};