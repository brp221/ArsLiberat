const express = require('express');
const collectionRouter = express.Router();
const https =require("https")
const dfd = require("danfojs-node")
// const axios = require('axios').default;
var request = require('request');


collectionRouter.get('/', async(req,res)=>{
  const options = {
    method: 'GET',
    hostname: 'api.opensea.io',
    port: null,
    path: '/api/v1/collections?offset=0&limit=140',
    headers: {
      accept: 'application/json'
    }
  };
  
  https.get(options, (resp) => {
    const chunks = [];
  
    resp.on('data', function (chunk) {
      chunks.push(chunk);
    });
  
    resp.on('end', function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
      jsonObject = JSON.parse(body.toString())["collections"];
      const filtered = jsonObject.filter(collection => collection.image_url !== null || collection.banner_image_url!== null);
      res.status(200).json(filtered);
    });
  });
});


collectionRouter.get('/trending/', async(req, res, next) => {

  var options = {
      url: 'https://api.rarify.tech/data/contracts',
      headers: {
          'Authorization': 'Bearer d0a569d1-f90c-4789-817d-09c1bc024436',
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'insights_trends.period=90d&include=insights_trends&sort=-insights_trends.volume_change_percent' //&page[limit]=6
  };

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        jsonObject = JSON.parse(body)["data"]
        const filtered = jsonObject.filter(collection => collection.attributes.image_url !== "");
        console.log("filtered : ", filtered)
        res.status(200).json(filtered);
      }
  }

  request(options, callback);
});

//fetches all nfts and their corresponding metadata (image + traits) 
collectionRouter.get('/:collection_address/', async(req, res, next)=>{
  const options = {
    "method": "GET",
    "hostname": "api.nftport.xyz",
    "port": null,
    "path": "/v0/nfts/"+req.params["collection_address"]+"?chain=ethereum&include=all",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": process.env.NFT_PORT_API_KEY
    }
  };
  
  https.get(options, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {data += chunk;});

    resp.on('end', () => {
      console.log("data: ", data)
      const result = JSON.parse(data)["nfts"];                                           //convert into json object
      res.status(200).json(result);
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
    res.status(404);
  });
})

//fetches all nfts and their corresponding metadata (image + traits) 
collectionRouter.get('/:collection_address/metadata/', async(req, res, next)=>{
  var header = "https://eth-mainnet.g.alchemy.com/nft/v2/"+process.env.ALCHEMY_API_KEY+ "/getContractMetadata?contractAddress="+req.params['collection_address']
  console.log(header)
  https.get(header, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {data += chunk;});

    resp.on('end', () => {
      var result = JSON.parse(data);                                               //convert into json object
      console.log(result)
      res.status(200).json(result);
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
    res.status(404);
  });
})


//fetches sales stats for nft 
collectionRouter.get('/:collection_address/sales_stats', async(req, res, next)=>{
  const options = {
    "method": "GET",
    "hostname": "api.nftport.xyz",
    "port": null,
    "path": "/v0/transactions/stats/"+req.params["collection_address"]+"?chain=ethereum",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": process.env.NFT_PORT_API_KEY
    }
  };
  https.get(options, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {data += chunk;});

    resp.on('end', () => {
      const result = JSON.parse(data)["statistics"];                                           //convert into json object
      console.log("result: ",result)
      res.status(200).json(result);
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
    res.status(404);
  });
})


//fetches collcetion by search 
collectionRouter.get('/:collection_address/search',async(req, res, next)=>{
  // https://ubiquity.docs.blockdaemon.com/swagger-ui/#/NFT/Search%20NFT%20Collections
  const options = {
    "method": "GET",
    "hostname": "api.nftscoring.com",
    "port": null,
    "path": "/api/v1/traits/floor/collection/?collection_contract="+req.params['contract_addy'],
    "headers": {
        "Content-Type": "application/json",
        "Authorization": `Token ${process.env.NFT_SCORING_API_KEY }`
    }
  };    
  https.get(options, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {data += chunk;});

      resp.on('end', () => {
          const result = JSON.parse(data)["data"];                                               //convert into json object
          res.status(200).json(result);
          });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
    res.status(404).send(err.message);
  });
})

//fetches all unique owners of a collection
collectionRouter.get('/:collection_address/owners/', async(req, res, next)=>{
  const options = {
    method: 'GET',
    hostname: 'deep-index.moralis.io',
    port: null,
    path: "/api/v2/nft/"+req.params["collection_address"]+"/owners?chain=eth&format=decimal",
    headers: {
      accept: 'application/json',
      'X-API-Key': process.env.MORALIS_API_KEY
    }
  };
  
  https.get(options, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {data += chunk;});

    resp.on('end', () => {
      try {
        const result = JSON.parse(data,(k, v) => k != 'metadata' ? v : void 0)["result"];    //if metadata exists 
        let df = new dfd.DataFrame(result)
        df.print()
        let topOwners = df.groupby(["owner_of"]).col(["token_id"]).count().sortValues("token_id_count", {ascending:false})
        topOwners.print()   
        res.status(200).json(dfd.toJSON(topOwners));
      } 
      catch (error) {
          console.log("ERROR CAUGHT: ", error)
          res.status(204).send([]);
      }
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
    res.status(404);
  });
})

//fetches sales stats for nft 
collectionRouter.get('/:collection_address/transactions/', async(req, res, next)=>{

  const options = {
    "method": "GET",
    "hostname": "api.nftport.xyz",
    "port": null,
    "path": "/v0/transactions/nfts/"+req.params["collection_address"]+"?chain=ethereum&type=sale",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": process.env.NFT_PORT_API_KEY
    }
  };
  https.get(options, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {data += chunk;});

    resp.on('end', () => {
      console.log("data: ", data)
      const result = JSON.parse(data)["transactions"];     //filter out anything other than sale; what is cancel_list?
      res.status(200).json(result);
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
    res.status(404);
  });
})


collectionRouter.get('/wack/', async(req, res, next) => {
  //the whole point of this is images ... 
  endpoint='https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/collections?verified=true&apiKey='+process.env.DAEMON_API_KEY
  console.log(endpoint)
  https.get(endpoint, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {data += chunk;});

    resp.on('end', () => {
      const jsonObject = JSON.parse(data)["data"];                                               //convert into json object
      var result = jsonObject.filter(obj => obj.asset_id == req.params["token_id"]);         //filter named json object 
      res.status(200).json(result);
      });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
    res.status(404);
  });

  // retrieve media as well ? collection/beb2e33e-8470-5600-a740-787c8c367e65/logo.png those are separate calls so stache them 
  // https://blockdaemon.com/documentation/ubiquity-api/nft-api/get-nft-media/
});







module.exports = collectionRouter;