# 1. Motivated by price
#     User: "Hey when the price of this contract address drops to 6.5 alert me" 
req = {
    "contract_address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    "token_id":"5465",
    "recipient_email": "brp221@lehigh.edu", 
    "metadata":{
        "frozen_price": 85,
        "drop_to": 85,
        "currency": "eth"
    }
}
import http.client
import os 
from dotenv import load_dotenv
os.chdir('/Users/bratislavpetkovic/Desktop/ArsLiberat/cloud_function/')
from email_module import *
load_dotenv()
import json
import pandas as pd

#_________________________________________________________________________________________________________________________________
# 0 read minion request 

#_________________________________________________________________________________________________________________________________
# 1 get the listing for the asset. Process Data
conn = http.client.HTTPSConnection("api.nftscoring.com")

headers = {
    'Content-Type': "application/json",
    'Authorization': "Token c19fac8f6d5fcc87d5fcc4de815c560d8277d44a" # os.environ.get('API_KEY')
}

conn.request("GET", "/api/v1/listings/active/?collection_contract="+req["contract_address"], headers=headers)
res = conn.getresponse()
data = res.read().decode("utf-8")
json_data = json.loads(data)
df = pd.json_normalize(json_data, record_path =['data'])
df = df[df["asset_id"]==int(req["token_id"])]
#_________________________________________________________________________________________________________________________________

#Is current listing smaller than "drop_by" OR "drop_to"
if(int(df["payment.value_in_eth"]) <= int(req["metadata"]["drop_to"]) ):
    #initiate notification
    # termiante itself? 
    print(" A L E R T")
    content = " The listing for collection x, token_id y has fallen to " + str(df["payment.value_in_eth"]) + "from " + str(req["metadata"]["frozen_price"])
    print(content)
    send_email('brp221@lehigh.edu', req["recipient_email"], content)


#_________________________________________________________________________________________________________________________________
