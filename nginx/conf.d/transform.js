async function getNftsByAccount(r) {
  const urlPath = r.uri.split("/");

  const accountIndex = urlPath.indexOf("account");

  if (accountIndex !== -1) {
    const account = urlPath[accountIndex + 1];
    const api_key = process.env.API_KEY;

    ngx
      .fetch(
        `http://lineaapi.nftscan.com/api/v2/account/own/all/${account}?erc_type=&show_attribute=false&sort_field=&sort_direction=`,
        {
          headers: {
            "User-Agent": "Nginx",
            "X-API-KEY": api_key,
          },
        }
      )
      .then((res) => res.json())
      .then((response) => {
        const extensionPayload = response.data.map((nft) => {
          return {
            collectionAddress: nft.contract_address || "",
            description: nft.description || "",
            collectionName: nft.contract_name || "",

            assets: nft.assets.map((asset) => {
              return {
                name: asset.name || "",
                description: asset.description || "",
                image: asset.token_uri || "",
              };
            }),
          };
        });
        r.headersOut["Content-Type"] = "application/json";
        r.return(200, JSON.stringify(extensionPayload));
      })
      .catch((error) => {
        r.log(error);
        r.return(404, "URL parameters not found" + error);
      });
  } else {
    r.return(404, "URL parameters not found");
  }
}

export default { getNftsByAccount };
