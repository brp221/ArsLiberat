

# template 1 : 
# 
# # for the given NFT, has the price dropped? Increased? 
# Are other people offering anything? Anything on traits?

# INPUT:
# contract_address ---> address of the contract ( NFT or collection?)
# email_address    ---> email address to which report/ alert will be delivered
# conditional      ---> condition, which when met, will produce the alert s
# metadata 
    # frozen_price ---> on the day that alert is setup, what is the price
    # desired_price ---> can be absolute, or relative 
    # traits ? 






# OUTPUT :
# minion (cron * * * * *) which will keep checking if the provided conditionals are met by invoking nft api
# Once they are, notification is sent via gmail with a report/alert. ( ideally, eventually trade is executed >:} )