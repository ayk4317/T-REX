import '@xyrusworx/hardhat-solidity-json';
import '@nomicfoundation/hardhat-toolbox';
import { HardhatUserConfig } from 'hardhat/config';
import 'solidity-coverage';
import '@nomiclabs/hardhat-solhint';
import '@primitivefi/hardhat-dodoc';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

const BSCAPIKEY:string = process.env.BSCAPI ?? "";
const BSCTESTNET:string = process.env.BSCTESTNETURL ?? "";
const ARBAPIKEY:string = process.env.ARBAPI ?? "";
const ARBTESTNET:string = process.env.ARBTESTNETURL ?? "";

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    bscTest: {
      url: BSCTESTNET,
    },
    arbTest: {
      url: ARBTESTNET,
    }  
  },
  etherscan: {
    apiKey: {
      bscTestnet: BSCAPIKEY,
      arbSepolia: ARBAPIKEY
    },
    customChains: [
      {
        network: "arbSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io"
        }
      }
    ]
  },
  dodoc: {
    runOnCompile: false,
    debugMode: true,
    outputDir: "./docgen",
    freshOutput: true,
  },
};

export default config;
