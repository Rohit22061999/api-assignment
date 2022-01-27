const express = require('express')
const { getemp, postemp, deleteemp, updateemp, login } = require('../controller/empController')
const router = express.Router()
const jwt = require('jsonwebtoken');
const jwtSecret = "asdfghjklqwerty54321"


const { body, validationResult } = require('express-validator');

function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": 1, "msg": "First Login" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": err })
            }
            else {
                next();
            }
        })
    }
}


router.get('/getemp', autenticateToken, async (req, res) => {
    res.send(await getemp());
})
router.post('/postemp', body('EmployeeID').isLength({ min: 3 }), body('EmployeeName').isLength({ min: 3 }), body('EmployeeContact').isLength({ min: 10 }), (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        postemp(req.body)
        res.send("data added")
    }
})

router.delete('/deleteemp/:EmployeeID', body('EmployeeID').isLength({ min: 3 }), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        deleteemp(req.params.EmployeeID)
        res.send("Data deleted")
    }
})
router.put("/updateemp/:EmployeeID", body('EmployeeID').isLength({ min: 3 }), (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        console.log(req.body)
        updateemp(req.params.EmployeeID, req.body)
        res.send("data updated")
    }
})
router.post('/login', async (req, res) => {
    const token = await login(req.body)
    console.log(token)
    res.send({ token: token })

})


module.exports = router;