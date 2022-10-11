const scheduler = require('@google-cloud/scheduler');

const projectId = "nftzombies" //nftzombies
const locationId = "us-central1" // see: https://cloud.google.com/about/locations/ N. Virginia us-central1 
// (us-east4)
const url = "https://us-central1-nftzombies.cloudfunctions.net/function-1" // where should we say hello?

// Create a client.
const client = new scheduler.CloudSchedulerClient();

// Construct the fully qualified location path.
const parent = client.locationPath(projectId, locationId);


module.exports = {client, parent, url}