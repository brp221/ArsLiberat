Recipe 4 running locally :

1. Create the node app to be the server using npm init -y. 
Configure rest api using routing. Choose a port on which it will run. Point t=all teh traffic using * to the client/build/index.html

2. For the client, create the react app using npx create-react-app (or something similar). Configure routes accordingly using react router dom ( this deprecates
over time os make sure its up 2 date). Use 'npm run build' to generate the client/build/index.html. 

3. To run locally, in 2 side by side terminals, run them using npm start 


4. Setting up Cloud Scheduler credentials 4 LOCAL ENV
Incorrect method :
export GOOGLE_APPLICATION_CREDENTIALS="/Users/bratislavpetkovic/Downloads/nftzombies-b9a54986918f.json"
    https://cloud.google.com/scheduler/docs/reference/libraries#node.js_1 
( unset GOOGLE_APPLICATION_CREDENTIALS )

Correct method w success:
https://cloud.google.com/docs/authentication/provide-credentials-adc
in terminal:
brew install --cask google-cloud-sdk 
gcloud auth application-default login

Not sure what this is https://cloud.google.com/scheduler/docs/reference/rest/v1beta1/projects.locations.jobs/create ?

5. Configure GMAIL protocol :
pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib
    a. configure google admin account 
    b. buy domain:https://www.namecheap.com/ ( pwd in .env file, verify using TXT )

    a. JK failed that 2 be attempted another time : 
        solutino in the meantime: https://stackoverflow.com/questions/37201250/sending-email-via-gmail-python#miksus

6. come up with a cool name: 

    ars liberat --> art liberates us 
    NFT Zombies 
    NFT Minion Army 
    NFT Sniper

7. Come up with alerts/ reports structure ( Strategy Design Pattern) :
