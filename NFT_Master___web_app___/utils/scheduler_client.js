const scheduler = require('@google-cloud/scheduler');

const projectId = "nftzombies" //nftzombies
const locationId = "us-central1" // see: https://cloud.google.com/about/locations/ N. Virginia us-central1 
// (us-east4)

// Create a client.
const client = new scheduler.CloudSchedulerClient();

// Construct the fully qualified location path.
const parent = client.locationPath(projectId, locationId);


module.exports = {client, parent}