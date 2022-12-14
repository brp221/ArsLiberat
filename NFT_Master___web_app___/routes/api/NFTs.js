// const { json } = require('express');
const express = require('express');
const nftsRouter = express.Router();
const https =require("https")



// https://docs.alchemy.com/reference/notify-api-quickstart


//get all nfts WACK AFF
nftsRouter.get('/', async(req, res, next) => {
    const options = {
        "method": "GET",
        "hostname": "api.nftport.xyz",
        "port": null,
        "path": "/v0/nfts?chain=ethereum&include=metadata",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": process.env.NFT_PORT_API_KEY 
        }
    };
  
    const api_req = https.request(options, function (api_resp) {
        const chunks = [];
      
        api_resp.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        api_resp.on("end", function () {
          const body = Buffer.concat(chunks);
          res.status(201).json(body.toString());
        });
      });
      
      api_req.end();
});


//get specified nft
nftsRouter.get('/:contract_addy/:token_id/', async(req, res, next) => {

    const options = {
        "method": "GET",
        "hostname": "api.nftport.xyz",
        "port": null,
        "path": "/v0/nfts/"+req.params["contract_addy"]+"/"+req.params["token_id"]+"?chain=ethereum",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": process.env.NFT_PORT_API_KEY
        }
      };
    https.get(options, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {data += chunk;});

        resp.on('end', () => {
            const jsonObject = JSON.parse(data)["nft"];                                               //convert into json object
            console.log(jsonObject)
            res.status(201).json(jsonObject);
            });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
      res.status(404);
    });
});



//get listings for said nft 
nftsRouter.get('/:contract_addy/:token_id/listings/', async(req, res, next) => {

    const options = {
        "method": "GET",
        "hostname": "api.nftscoring.com",
        "port": null,
        "path": "/api/v1/listings/active/?collection_contract="+req.params['contract_addy'],
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Token ${process.env.NFT_SCORING_API_KEY }`
        }
    };    
    https.get(options, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {data += chunk;});

        resp.on('end', () => {
            var result = JSON.parse(data)["data"];                                               //convert into json object
            var result = result.filter(record => record.asset_id == req.params['token_id'])
            console.log(result)
            res.status(201).json(result);
            });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
      res.status(404);
    });
});



//get rarity data for the specified NFT 
nftsRouter.get('/:contract_addy/:token_id/rarity/', async(req, res, next) => {
    var header = "https://eth-mainnet.g.alchemy.com/nft/v2/"+process.env.ALCHEMY_API_KEY+ "/computeRarity?contractAddress="+req.params['contract_addy']+"&tokenId="+req.params["token_id"]
    console.log(header)
    https.get(header, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {data += chunk;});

        resp.on('end', () => {
            try {
                var result = JSON.parse(data);       
            } catch (error) {
                console.log("ERROR CAUGHT: ", error)
                res.status(204).send([]);
            }
            //convert into json object
            console.log(result)
            res.status(201).json(result);
            });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
      res.status(404);
    });
});






module.exports = nftsRouter
