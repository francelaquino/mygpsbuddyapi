const express = require('express')
const router = express.Router()
const pool = require('../config/database')
const email = require('../modules/email')
const uuidv4 = require('uuid/v4');
const moment = require('moment');


router.post('/forgotpassword', (req, res) => {
    pool.getConnection((errorPool, conn) => {
        if (errorPool) {
            res.status(500).json({
                message: 'Something went wrong!'
            })
        } else {

            const queryString = `select uid, firstname from members where email='${req.body.email}' and isverify='Y'`;

            pool.query(queryString, (err, rows, fields) => {
             
                if (err) {
                    res.status(500).json({
                         message: 'Something went wrong!',
                    })
                    conn.release();
                } else {
                    if(rows.length<=0){
                      
                      res.status(200).json({
                        message:'Unknown email address!',
                        completed:false
                      })  
                      
                      conn.release();
                    }else{
                      
                      let uid=uuidv4();
                      let expiration=moment().add(4,'hours').format("YYYY-MM-DD HH:mm");

                       const queryString = `update members set resettoken='${uid}',resettokenexpiration='${expiration}' where email='${req.body.email}' and isverify='Y'`;

                        pool.query(queryString, (err, rows, fields) => {
                          
                          if (err) {
                            res.status(500).json({
                                message: 'Something went wrong!',
                                completed:false
                            })
                            conn.release();
                          } else {
                            res.status(200).json({
                                message:'Password reset instruction has been sent to your email address',
                                completed:true
                              });
                              conn.release();
                          }
                        })
                    }
                }
            });
        }
    });

});


router.post('/registration', (req, res) => {
    pool.getConnection((errorPool, conn) => {
        if (errorPool) {
            res.status(500).json({
                message: 'Something went wrong!'
            })
        } else {

            const queryString = `select id from members where email='${req.body.email}' and isverify='Y'`;

            pool.query(queryString, (err, rows, fields) => {
             
                if (err) {
                    res.status(500).json({
                         message: 'Something went wrong!',
                    })
                    conn.release();
                } else {
                    if(rows.length>0){
                      
                      res.status(200).json({
                        message:'Email address already used!',
                        completed:false
                      })  
                      
                      conn.release();
                    }else{
                      
                      let uid=uuidv4();
                      let expiration=moment().add(5,'days');

                       const queryString = `insert into members(uid,firstname,middlename,lastname,email,gender,isverify,password,birthdate,country,mobileno,datecreated,datemodified,active) values('${uid}','${req.body.firstname}','${req.body.middlename}','${req.body.lastname}','${req.body.email}','${req.body.gender}','N','${req.body.password}','${req.body.birthdate}','${req.body.country}','${req.body.mobileno}',now(),now(),'Active')`;

                        pool.query(queryString, (err, rows, fields) => {
                          
                          if (err) {
                            res.status(500).json({
                                message: 'Something went wrong!',
                                completed:false
                            })
                            conn.release();
                          } else {
                            res.status(200).json({
                                message:'Registration has been completed',
                                completed:true
                              });
                              conn.release();
                          }
                        })
                    }
                }
            });
        }
    });

});


router.get('/', (req, res) => {
    
    pool.getConnection((errorPool, conn) => {
        if (errorPool) {
            res.status(500).json({
                message: 'Something went wrong!'
            })
        } else {

            const queryString = `select  * from members`;

            pool.query(queryString, (err, rows, fields) => {
                if (err) {
                    res.status(500).json({
                        message: 'Something went wrong!'
                    })
                    conn.release();
                } else {
                    res.status(200).json({
                        results: rows,
                    })
                    conn.release();
                }
            });
        }
    });

});
module.exports = router