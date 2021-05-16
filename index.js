function createEmployeeRecord(arraySet){
    let employeeInfo
    return employeeInfo = {
        firstName: arraySet[0],
        familyName: arraySet[1],
        title: arraySet[2],
        payPerHour: arraySet[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arraysSet){
    return arraysSet.map(createEmployeeRecord)
}

function createTimeInEvent(timeInType, dateStamp){
    //date stamp must be in format "YYYY-MM-DD HHMM" 
    let [date,hour] = dateStamp.split(' ')

    timeInType.timeInEvents.push({
        type: "TimeIn",
        date: (date),
        hour: parseInt(hour, 10)
    })
    return timeInType
}

function createTimeOutEvent(timeOutType, dateStamp){
    let [date,hour] = dateStamp.split(' ')

    timeOutType.timeOutEvents.push({
        type: "TimeOut",
        date: (date),
        hour: parseInt(hour, 10)
    })
    return timeOutType
}

function hoursWorkedOnDate(employeeHours, dateStamp){
  //need to simply subtract timeOutEvent from timeInEvent
    let timeIn = employeeHours.timeInEvents.find(function(e){
        return e.date === dateStamp
    })

    let timeOut = employeeHours.timeOutEvents.find(function(e){
        return e.date === dateStamp
    })

    let hoursWorked = (timeOut.hour - timeIn.hour)/100
    return hoursWorked

}

function wagesEarnedOnDate (employeeWage, dateStamp){
    let wageAmount = hoursWorkedOnDate(employeeWage, dateStamp) * employeeWage.payPerHour
    return wageAmount
}

function allWagesFor(employee){
    let wageDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = wageDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

function findEmployeeByFirstName (srcArray, firstName) {
    return srcArray.find(function (resultFind){
      return resultFind.firstName === firstName
    })
}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
