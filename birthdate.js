//////////////// C O N S T A N T E S ////////////////
// Date object from birthday date
const birthDayDate = new Date("1995-08-09T22:08:00")
//////////////// V A R I A B L E S ////////////////
// Previous elapsed time in custom object
let previousElapsedTime = null
//////////////// F U N C T I O N S ////////////////
// get the elapsed time from birthday date to other date into a custom date object
const getElapsedTime = (date, birthdayDate) => {
  let years = date.getFullYear() - birthdayDate.getFullYear()
  let months = date.getMonth() - birthdayDate.getMonth()
  let days = date.getDate() - birthdayDate.getDate()
  let hours = date.getHours() - birthdayDate.getHours()
  let minutes = date.getMinutes() - birthdayDate.getMinutes()
  let seconds = date.getSeconds() - birthdayDate.getSeconds()

  //handle negative values
  if (seconds < 0) {
    secondes += 60
    minutes--
  }
  if (minutes < 0) {
    minutes += 60
    hours--
  }
  if (hours < 0) {
    hours += 24
    days--
  }
  if (days < 0) {
    const previousDate = new Date(date.getFullYear(), date.getMonth(), 0)
    days += previousDate.getDate()
    months--
  }
  if (months < 0) {
    months += 12
    years--
  }

  return { years, months, days, hours, minutes, seconds }
}
// get a dom element from its id and display a data into a new span
const displayDataToDomElement = (id, data) => {
  const divContainer = document.getElementById(id)
  const dataSpan = document.querySelectorAll(`#${id} .data`)[0]
  if (!dataSpan) {
    const newSpan = document.createElement("span")
    newSpan.classList.add("data")
    newSpan.innerText = data
    divContainer.appendChild(newSpan)
  } else {
    dataSpan.innerText = data
  }

}
// compare the previous custom date object to new one and return object with modified values
const getModifiedData = (previous, actual) => {
  if (!previous) return
  const modifiedData = Object.keys(previous)
    .reduce((modifiedData, key) => {
      if (previous[key] !== actual[key]) modifiedData[key] = actual[key]
      return modifiedData
    }, {})
  return modifiedData
}
// create the counter from now to birthday and display it to the dom
const main = (birthDayDate) => {
  // Date Object from the actual time
  const actualDate = new Date
  // Elapsed time from birthday to now 
  const elapsedTime = getElapsedTime(actualDate, birthDayDate)
  // Display all data into elapsedTime object to the dom for the first time
  if (!previousElapsedTime) {
    console.log("now!!")
    const ids = Object.keys(elapsedTime)
    ids.forEach(id => displayDataToDomElement(id, elapsedTime[id]))
  } else {
    const modifiedData = getModifiedData(previousElapsedTime, elapsedTime)
    const modifiedIds = Object.keys(modifiedData)
    modifiedIds.forEach(id => displayDataToDomElement(id, elapsedTime[id]))
  }
  // Save elapsed time from this interval to compare it from the next one
  previousElapsedTime = elapsedTime
  //console.log(elapsedTime)
}

// all seconds create date
setInterval(() => main(birthDayDate), 1000)


//displayDataToDomElement('minutes', convertSecondsToDate(elapsedSeconds).minutes)
