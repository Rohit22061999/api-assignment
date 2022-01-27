const mongoose = require('mongoose')
const empModel = require('../db/employeeSchema')
const jwt = require('jsonwebtoken');
const jwtSecret = "asdfghjklqwerty54321"

async function postemp(data) {
    let ins = await new empModel(data)
    ins.save((err) => {
        if (err) throw err;
    })
}

async function getemp() {
    return await empModel.find({})
}

async function deleteemp(empid) {

    console.log(empid)
    empModel.deleteOne({ EmployeeID: empid }, (err) => {
        if (err) throw err;
    })
}

async function updateemp(empid, data) {
    console.log(empid)
    console.log(data)

    await empModel.updateOne({ EmployeeID: empid }, { $set: { EmployeeName: data.EmployeeName, EmployeeContact: data.EmployeeContact } }).exec((err) => {
        console.log(err)
        if (err) throw err;
    })
}

async function login(data) {
    console.log(data)
    console.log('1')

    let payload = {
        EmployeeID: data.EmployeeID,
        EmployeeContact: data.EmployeeContact
    }
    const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
    console.log(token)
    return (token)



}

module.exports.getemp = getemp
module.exports.postemp = postemp
module.exports.deleteemp = deleteemp
module.exports.updateemp = updateemp
module.exports.login = login
