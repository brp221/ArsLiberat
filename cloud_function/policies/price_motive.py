# 1. Motivated by price
#     User: "Hey when the price of this contract address drops to 6.5 alert me" 
req1 = {
    "contract_addy": "0x620b70123fb810f6c653da7644b5dd0b6312e4d8/4926",  #/4926", # space doodle 
    "email_address": "brp221@lehigh.edu", # or user address
    "metadata":{
        "frozen_price": 6.911,
        "desired_price": 6.5   #or 10 %
    }
}


from nft_api import * 


#get the moving price of the req
res = stats_by_NFT(req1["contract_addy"])
