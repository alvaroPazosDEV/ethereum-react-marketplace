const NFTMarketplace = artifacts.require('NFTMarketplace');

contract('NFTMarketplace', () => {
  let nftMarketplace = null;
  let listingPrice = null;
  let auctionPrice = null;
  let accounts = null;

  before(async () => {
    nftMarketplace = await NFTMarketplace.deployed();
    listingPrice = await nftMarketplace.getListingPrice();
    auctionPrice = web3.utils.toWei('1', 'ether');
    accounts = await web3.eth.getAccounts();
  });
  it('Should deploy smart contract properly', async () => {
    console.log(nftMarketplace.address);
    assert(nftMarketplace.address !== '');
  });
  it('Should create two tokens', async () => {
    console.log(auctionPrice.toString(), listingPrice.toString());
    await nftMarketplace.createToken(
      'https://www.mytokenlocation.com',
      auctionPrice,
      { value: listingPrice }
    );
    await nftMarketplace.createToken(
      'https://www.mytokenlocation2.com',
      auctionPrice,
      { value: listingPrice }
    );
    const mkpItems = await nftMarketplace.fetchMarketItems();
    assert(mkpItems.length === 2);
  });
  it('Should buy a token from another account', async () => {
    await nftMarketplace.createMarketSale(1, {
      from: accounts[1],
      value: auctionPrice,
    });
    const mkpItems = await nftMarketplace.fetchMarketItems();
    assert(mkpItems.length === 1);
  });
  it('Should confirm the token ownership', async () => {
    const myItems = await nftMarketplace.fetchMyNFTs({
      from: accounts[1],
    });
    assert(myItems.length === 1);
  });
  it('Should resell a token', async () => {
    await nftMarketplace.resellToken(1, auctionPrice, {
      from: accounts[1],
      value: listingPrice,
    });
    const mkpItems = await nftMarketplace.fetchMarketItems();
    assert(mkpItems.length === 2);
  });
});
