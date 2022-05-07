import { ethers } from 'ethers';
import axios from 'axios';
import Web3Modal from 'web3modal';

import NFTMarketplace from 'artifacts/contracts/NFTMarketplace.json';
const marketplaceAddress = '0xb191A6bbf60d371741Ea528453cf171407D8a473';

const etherScanUri = 'https://rinkeby.etherscan.io/tx';

export interface MarketItem {
  price: string;
  tokenId: string;
  seller: string;
  owner: string;
  imageUri: string;
  name: string;
  description: string;
}

export interface ServiceResponse {
  success: boolean;
  message: string;
}

interface Web3Error {
  code: number;
  message: string;
}

const isWeb3Error = (x: any): x is Web3Error => {
  return typeof x.code === 'number';
};

const web3 = {
  getContract: async (): Promise<ethers.Contract> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    return contract;
  },

  getUserInfo: async (): Promise<{
    address: string;
    balance: string;
  } | null> => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);

      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      let balance = await provider.getBalance(userAddress);
      return {
        address: userAddress,
        balance: ethers.utils.formatEther(balance),
      };
    } catch (error) {
      return null;
    }
  },

  createToken: async (url: string, price: string): Promise<ServiceResponse> => {
    let response: ServiceResponse = {
      success: false,
      message: '',
    };
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        marketplaceAddress,
        NFTMarketplace.abi,
        signer
      );
      let listingPrice = await contract.getListingPrice();
      const formattedPrice = ethers.utils.parseUnits(price, 'ether');

      let transaction = await contract.createToken(url, formattedPrice, {
        value: listingPrice,
      });
      const tx = await transaction.wait();
      response.success = true;
      response.message = `${etherScanUri}/${tx.transactionHash}`;
    } catch (error) {
      if (isWeb3Error(error)) {
        response.message = error.message;
      } else {
        response.message = 'Unexpected error';
      }
    } finally {
      return response;
    }
  },

  resellToken: async (
    tokenId: string,
    price: string
  ): Promise<ServiceResponse> => {
    let response: ServiceResponse = {
      success: false,
      message: '',
    };
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        marketplaceAddress,
        NFTMarketplace.abi,
        signer
      );
      let listingPrice = await contract.getListingPrice();
      const formattedPrice = ethers.utils.parseUnits(price, 'ether');
      let transaction = await contract.resellToken(tokenId, formattedPrice, {
        value: listingPrice,
      });
      const tx = await transaction.wait();
      response.success = true;
      response.message = `${etherScanUri}/${tx.transactionHash}`;
    } catch (error) {
      if (isWeb3Error(error)) {
        response.message = error.message;
      } else {
        response.message = 'Unexpected error';
      }
    } finally {
      return response;
    }
  },

  buyMarketItem: async (
    tokenId: string,
    price: string
  ): Promise<ServiceResponse> => {
    let response: ServiceResponse = {
      success: false,
      message: '',
    };
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        marketplaceAddress,
        NFTMarketplace.abi,
        signer
      );
      const formattedPrice = ethers.utils.parseUnits(price.toString(), 'ether');
      let transaction = await contract.createMarketSale(tokenId, {
        value: formattedPrice,
      });
      const tx = await transaction.wait();
      response.success = true;
      response.message = `${etherScanUri}/${tx.transactionHash}`;
    } catch (error) {
      if (isWeb3Error(error)) {
        response.message = error.message;
      } else {
        response.message = 'Unexpected error';
      }
    } finally {
      return response;
    }
  },

  fetchMarketItems: async (
    myCollection?: boolean
  ): Promise<MarketItem[] | null> => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        marketplaceAddress,
        NFTMarketplace.abi,
        signer
      );
      let result = myCollection
        ? await contract.fetchMyNFTs()
        : await contract.fetchMarketItems();
      let marketData: MarketItem[] = [];
      for (const item of result) {
        const tokenUri = await contract.tokenURI(item.tokenId);
        const { data: tokenData } = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(item.price.toString(), 'ether');
        const marketItem = {
          price,
          tokenId: item.tokenId.toNumber(),
          seller: item.seller,
          owner: item.owner,
          imageUri: tokenData.image,
          name: tokenData.name,
          description: tokenData.description,
        };
        marketData.push(marketItem);
      }
      return marketData;
    } catch (error) {
      return null;
    }
  },
};

export default web3;
