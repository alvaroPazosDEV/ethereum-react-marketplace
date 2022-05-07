import { create, IPFSHTTPClient } from 'ipfs-http-client';

const base_url = 'https://ipfs.infura.io:5001/api/v0';

const infuraAPI = {
  uploadImage: async (file: File): Promise<string | null> => {
    try {
      const ipfs = create({ url: base_url });
      const result = await (ipfs as IPFSHTTPClient).add(file);
      return `https://ipfs.infura.io/ipfs/${result.path}`;
    } catch (e) {
      console.log('Error: ', e);
      return null;
    }
  },

  uploadTokenData: async (
    name: string,
    description: string,
    imageUri: string
  ): Promise<string | null> => {
    try {
      const ipfs = create({ url: base_url });
      const data = JSON.stringify({ name, description, image: imageUri });
      const result = await (ipfs as IPFSHTTPClient).add(data);
      return `https://ipfs.infura.io/ipfs/${result.path}`;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default infuraAPI;
