# also check out alchemy : https://docs.alchemy.com/docs/how-to-get-all-nfts-owned-by-an-address

import http.client
import os 
from dotenv import load_dotenv
os.chdir('/Users/bratislavpetkovic/Desktop/NFT_Master/cloud_function')
load_dotenv()

headers = {
    'Content-Type': "application/json",
    'Authorization': os.environ.get('API_KEY')
    }

def get_by_wallet_addy(wallet_addy: str):
    conn = http.client.HTTPSConnection("api.nftport.xyz")
    conn.request("GET", "/v0/accounts/"+wallet_addy+"?chain=ethereum&include=metadata", headers=headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))
    return data 

def get_by_contract_addy(contract_addy: str, token_id: str):
    conn = http.client.HTTPSConnection("api.nftport.xyz")
    conn.request("GET", "/v0/nfts/"+contract_addy+"/"+token_id+"?chain=ethereum&include=metadata", headers=headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))
    return data 

def stats_by_NFT(contract_addy: str):
    conn = http.client.HTTPSConnection("api.nftport.xyz")
    conn.request("GET", "/v0/transactions/stats/"+contract_addy+"?chain=ethereum", headers=headers)
    # conn.request("GET", "/v0/transactions/stats/0x620b70123fb810f6c653da7644b5dd0b6312e4d8?chain=ethereum", headers=headers)

    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))
    return data 

def transactions_by_contract(contract_addy:str, type_metadata:list):
    conn = http.client.HTTPSConnection("api.nftport.xyz")
    print(type_metadata)
    conn.request("GET", "/v0/transactions/nfts/"+contract_addy+"?chain=ethereum&type=all", headers=headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))
    return data 

# example1 = get_by_wallet_addy("0x0beed7099af7514ccedf642cfea435731176fb02")
# example2 = get_by_contract_addy("0x12f28e2106ce8fd8464885b80ea865e98b465149", "100030071")
# example3 = stats_by_NFT("0x620b70123fb810f6c653da7644b5dd0b6312e4d8")

# all_NFT = get_all()
