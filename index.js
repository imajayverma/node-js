var express = require('express');
var router = express.Router();
app = express();

var mydb = require('../db/database');
var mydb2 = require('../db/database2');

//print/////////////////////////////
router.get('/api/first', function(req, res, next) {

    mydb.find({}, function(err, result) {
        if (err) throw err
        else
            res.json(result)
    })
})

//print particular data
router.get('/api/first/:id', function(req, res, next) {
    let id = req.params.id;
    // console.log(id);
    mydb.find({
        _id: id
    }, function(err, result) {
        if (err) throw err
        else
            res.json(result)
    })
});

//insert////////////////////
router.post('/api/first', function(req, res, next) {
    const newdata = req.body;
    // newdata.salary.total = newdata.salary.general.hra + newdata.salary.general.da+newdata.salary.general.basic+newdata.salary.general.allAllowances+newdata.salary.bonus+newdata.salary.general.gratuity;

let income = newdata.salary.general;
let sumIncome=0;
for (var key in income) {
    sumIncome = sumIncome+income[key];
    // console.log(sumIncome);
}
newdata.salary.total = sumIncome+newdata.salary.bonus;
    console.log(newdata);
    mydb.create(newdata, function(err, data) {
        if (err) throw err
        else
            console.log('data inserted', data)
        res.json(data)
    })

});

//delete//////////////////////
router.delete('/api/first/:id', function(req, res, next) {
    let id = req.params.id;

    mydb.deleteOne({
        _id: id
    }, function(err, obj) {
        if (err) throw err
        else
            console.log('data deleted', obj)
        res.json(obj);
    })
});

//delete all data
router.delete('/api/first/', function(req, res, next) {
    mydb.remove({}, function(err, obj) {
        if (err) throw err
        else
            console.log('all data deleted', obj)
        res.json(obj);
    })
});

// update /////////////////
router.put('/api/first/:id', function(req, res, next) {
    const id = req.params.id;
    const newdata = req.body;
    mydb.update({
        _id: id
    }, {
        $set: newdata
    }, function(err, result) {
        if (err) {
            console.log(err);

        } else {
            console.log(result);
            res.json(result);
        }
    });

});


module.exports = router;