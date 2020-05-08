/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const createEmployeeRecord = (employee) => {
    const record = new Object
    debugger // mystery hack to get the tests to work??
    [record.firstName, record.familyName, record.title, record.payPerHour] = employee 
    record.timeInEvents = new Array
    record.timeOutEvents = new Array
    return record
}

const createEmployees = (employees) => {
    const records = employees.map(record => createEmployeeRecord(record))
    return records
}

const createTimeInEvent = function(timeString) {
    const [date, hour] = timeString.split(" ")
    this.timeInEvents.push({type: "TimeIn", date: date, hour: parseInt(hour,10)})
    return this 
}

const createTimeOutEvent = function(timeString) {
    const [date, hour] = timeString.split(' ')
    this.timeOutEvents.push({type: "TimeOut", date: date, hour: parseInt(hour, 10)}) 
    return this
}

const hoursWorkedOnDate = function(dateString) {
    const timeIn = this.timeInEvents.find(t => {return t.date === dateString}),
          timeOut = this.timeOutEvents.find(t => {return t.date === dateString})
    return (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = function(dateString) {
    const rate = this.payPerHour
    return hoursWorkedOnDate.call(this, dateString) * rate
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const calculatePayroll = (records) => {
    return records.reduce((accumulator, record) => {return accumulator + allWagesFor.call(record)},0)
}

const createEmployeeRecords = (data) => {
    return data.map(record => {return createEmployeeRecord(record)})
}

const findEmployeebyFirstName = (records, firstName) => {
    return records.find(r => {return r.firstName === firstName})
}