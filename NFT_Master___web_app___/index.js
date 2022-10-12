
const express = require("express")
var cors = require('cors');
const dotenv = require("dotenv");
dotenv.config(); 
const path = require("path");

const PORT  = process.env.PORT || 9000

// routes
const user = require('./routes/api/users');
const minions = require('./routes/api/minions');
const collections = require('./routes/api/collections');
const NFTs = require('./routes/api/NFTs');


const app = express()
app.use(express.static(path.join(__dirname, "client/build")))


// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));
//path to index.html
const index_dir = path.resolve(__dirname, 'client', 'build', 'index.html');

//using Routes
app.get("/api", (req, res)=>{
    res.json({message: "welcome to the NFT_Master api "});
})
app.use('/api/users', user);
app.use('/api/minions', minions);
app.use('/api/collections', collections);
app.use('/api/NFTs', NFTs);

//all get requsets that do not belong to the above routes are relayed to index_dir
app.get('*', (req, res) => {
    res.sendFile(index_dir);
    });

app.listen(PORT, () => console.log(`Server running on port ${PORT} \n`));
