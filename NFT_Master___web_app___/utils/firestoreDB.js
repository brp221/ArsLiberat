var admin = require("firebase-admin");
var serviceAccount = require("../firebase_credentials.json");
module.exports = admin.initializeApp({credential: admin.credential.cert(serviceAccount)}).firestore();
