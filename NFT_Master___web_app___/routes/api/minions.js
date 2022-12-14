const express = require('express');
const minionRouter = express.Router();
const firestore = require("../../utils/firestoreDB");
// const minionsCollection = firestore.collection('minions');
const schedulerClient = require("../../utils/scheduler_client")
//checkUserLoggedIn
// router.get('/', (req, res) => {
//     res.json({"get":"route"});
//   });

minionRouter.get('/', async(req, res, next) => {
    const allMinions = await firestore.collection('minions').get();
    if (allMinions.empty) {
        console.log('No matching minions.');
        return;
      }  
      const collection = [];
      allMinions.forEach(doc => {
        console.log(collection)
        collection.push({"UserName":doc.data()["UserName"], "Name":doc.data()["Name"], "Minions":doc.data()["Minions"]})
      });
    return res.status(200).json(collection);
});


minionRouter.post('/', async(req, res, next)=>{
    //check that the user does not exceed their quota

    console.log("request: ", req.body);
    console.log(JSON.stringify(req.body));
    console.log(Buffer.from(JSON.stringify(req.body)));
    console.log(req.body.metadata.minion_name);
    const uri = "https://us-central1-nftzombies.cloudfunctions.net/price-motive/" // where should we say hello?

    //provision a jobs
    // Construct the request body.
    const job = {
        httpTarget: {
          uri: uri,
          httpMethod: 'POST',
          body: btoa(JSON.stringify(req.body))
          authentica // putting proj on hold, need to refactor to include pub sub https://towardsdatascience.com/how-to-schedule-a-python-script-on-google-cloud-721e331a9590
          // body: Buffer.from(JSON.stringify(req.body)),
        },
        schedule: '*/12 * * * *',
        timeZone: 'America/Los_Angeles',
        name: "projects/nftzombies/locations/us-central1/jobs/" + req.body.metadata.minion_name
    };
    const request = {
        parent: schedulerClient.parent,
        job: job
    }
    // Use the client to send the job creation request.
    const [response] = await schedulerClient.client.createJob(request);
    console.log(`Created job: ${response.name}`);

    // persist in the db ? 
    // minion
      //ID/ Minion_Name which corresponds in the GC
      //description
      //metadata
      //user
      return res.status(201).json(response);

})


minionRouter.get('/:name', async(req, res, next)=>{
  //check that the user does not exceed their quota

  console.log("request: ", req.body)
  //provision a jobs
  // Construct the request body.
  const job = {
      httpTarget: {
        uri: schedulerClient.url,
        httpMethod: 'POST',
        body: req.body
      },
      schedule: '* * * * *',
      timeZone: 'America/Los_Angeles'
  };
  const request = {
      parent: schedulerClient.parent,
      job: job
  }
  // Use the client to send the job creation request.
  const [response] = await schedulerClient.client.createJob(request);
  console.log(`Created job: ${response.name}`);

  // persist in the db ? 
  return res.status(200).json(response);
})


  module.exports = minionRouter;