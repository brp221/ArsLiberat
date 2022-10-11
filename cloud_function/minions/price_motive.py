# 1. Motivated by price
#     User: "Hey when the price of this contract address drops to 6.5 alert me" 
req1 = {
    "contract_addy": "0x620b70123fb810f6c653da7644b5dd0b6312e4d8",  #/4926", # space doodle 
    "token_id":"4926",
    "recipient_email": "brp221@lehigh.edu", # or user address
    "metadata":{
        "frozen_price": 6.911,
        "drop_to": 6.5,
        "drop_by": None,
        "currency": "eth"
    }
}

from nft_api import * 


# get the listing for the price. 

#Is it smaller than "drop_by" OR "drop_to"

#If yes, initiate notification process

#get the moving price of the req
