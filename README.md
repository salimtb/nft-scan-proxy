# nft-scan-proxy
nft scan proxy

# start 
copy your scan nft api key to the docker compose line 11

create your docker image and run it using
`docker-compose up -d`

send your request using the following curl

`curl --location 'proxy.localhost/nfts/account/0x165c135b7ae5081321bfa475c01560efe728966f'`
