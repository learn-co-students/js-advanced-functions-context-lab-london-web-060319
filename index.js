/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployees = function(employeeData){
    return employeeData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let hoursWorkedOnDate = function(theDate){
    let intime = this.timeInEvents.find(function(e){
        return e.date === theDate
    })
    let outtime = this.timeOutEvents.find(function(e){
        return e.date === theDate
    })

    return(outtime.hour - intime.hour)/100
}

let wagesEarnedOnDate = function(theDate){
    let rawWage = hoursWorkedOnDate.call(this, theDate)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}


let calculatePayroll = function(employeeArray){
    return employeeArray.reduce(function(memo, record){
        return memo + allWagesFor.call(record)
    }, 0)
}

let createEmployeeRecords = function(employees){
    return employees.map(function(row){
        return createEmployeeRecord(row)
    })
}

let findEmployeebyFirstName = function(employees, name){
    return employees.find(function(employee){
        return employee.firstName === name
    })
}