const express = require('express');
const userRouter = express.Router();
const firestore = require("../../utils/firestoreDB");
// const usersCollection = firestore.collection('users');

//checkUserLoggedIn
// router.get('/', (req, res) => {
//     res.json({"get":"route"});
//   });

userRouter.get('/', async(req, res, next) => {
    const allUsers = await firestore.collection('users').get();
    if (allUsers.empty) {
        console.log('No matching documents.');
        return;
      }  
      const collection = [];
      allUsers.forEach(doc => {
        console.log(collection)
        collection.push({"UserName":doc.data()["UserName"], "Name":doc.data()["Name"], "Minions":doc.data()["Minions"]})
      });
    return res.status(201).json(collection);
});


  module.exports = userRouter;