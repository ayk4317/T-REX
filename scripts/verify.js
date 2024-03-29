const hre = require("hardhat");
require('dotenv').config();

async function main() {
    const ZEROADDR = hre.ethers.constants.AddressZero;
    const DEADADDR = "0x000000000000000000000000000000000000d3ad"
    
    // //TREXImplementationAuthority and Implementation Contracts
    // await hre.run("verify:verify", {
    //     address: process.env.BSCTEST_TREXIMPLEMENTATIONAUTHORITY,
    //     constructorArguments: [true, ZEROADDR, ZEROADDR],
    //     contract: "contracts/proxy/authority/TREXImplementationAuthority.sol:TREXImplementationAuthority"
    // });

    // await hre.run("verify:verify", {
    //     address: process.env.BSCTEST_TOKENIMPLEMENTATION,
    //     constructorArguments: [],
    //     contract: "contracts/token/Token.sol:Token"
    // });

    // await hre.run("verify:verify", {
    //     address: process.env.BSCTEST_CTRIMPLEMENTATION,
    //     constructorArguments: [],
    //     contract: "contracts/registry/implementation/ClaimTopicsRegistry.sol:ClaimTopicsRegistry"
    // });

    // await hre.run("verify:verify", {
    //     address: process.env.BSCTEST_IRIMPLEMENTATION,
    //     constructorArguments: [],
    //     contract: "contracts/registry/implementation/IdentityRegistry.sol:IdentityRegistry"
    // });

    // await hre.run("verify:verify", {
    //     address: process.env.BSCTEST_IRSIMPLEMENTATION,
    //     constructorArguments: [],
    //     contract: "contracts/registry/implementation/IdentityRegistryStorage.sol:IdentityRegistryStorage"
    // });

    // await hre.run("verify:verify", {
    //     address: process.env.BSCTEST_TIRIMPLEMENTATION,
    //     constructorArguments: [],
    //     contract: "contracts/registry/implementation/TrustedIssuersRegistry.sol:TrustedIssuersRegistry"
    // });

    // await hre.run("verify:verify", {
    //     address: process.env.BSCTEST_MCIMPLEMENTATION,
    //     constructorArguments: [],
    //     contract: "contracts/compliance/modular/ModularCompliance.sol:ModularCompliance"
    // });

    // //IAFactory and TREXFactory
    // await hre.run("verify:verify", {
    //     address: process.env.BSCTEST_TREXFACTORY,
    //     constructorArguments: [process.env.BSCTEST_TREXIMPLEMENTATIONAUTHORITY],
    //     contract: "contracts/factory/TREXFactory.sol:TREXFactory"
    // });

    // await hre.run("verify:verify", {
    //     address: process.env.BSCTEST_IAFACTORY,
    //     constructorArguments: [process.env.BSCTEST_TREXFACTORY],
    //     contract: "contracts/proxy/authority/IAFactory.sol:IAFactory"
    // });

    //Proxys
    await hre.run("verify:verify", {
        address: process.env.BSCTEST_SP0_TIR,
        constructorArguments: [process.env.BSCTEST_TREXIMPLEMENTATIONAUTHORITY],
        contract: "contracts/proxy/TrustedIssuersRegistryProxy.sol:TrustedIssuersRegistryProxy"
    });

    await hre.run("verify:verify", {
        address: process.env.BSCTEST_SP0_CTR,
        constructorArguments: [process.env.BSCTEST_TREXIMPLEMENTATIONAUTHORITY],
        contract: "contracts/proxy/ClaimTopicsRegistryProxy.sol:ClaimTopicsRegistryProxy"
    });

    await hre.run("verify:verify", {
        address: process.env.BSCTEST_SP0_MC,
        constructorArguments: [process.env.BSCTEST_TREXIMPLEMENTATIONAUTHORITY],
        contract: "contracts/proxy/ModularComplianceProxy.sol:ModularComplianceProxy"
    });

    await hre.run("verify:verify", {
        address: process.env.BSCTEST_SP0_IRS,
        constructorArguments: [process.env.BSCTEST_TREXIMPLEMENTATIONAUTHORITY],
        contract: "contracts/proxy/IdentityRegistryStorageProxy.sol:IdentityRegistryStorageProxy"
    });

    await hre.run("verify:verify", {
        address: process.env.BSCTEST_SP0_IR,
        constructorArguments: [process.env.BSCTEST_TREXIMPLEMENTATIONAUTHORITY, process.env.BSCTEST_SP0_TIR,
            process.env.BSCTEST_SP0_CTR, process.env.BSCTEST_SP0_IRS],
        contract: "contracts/proxy/IdentityRegistryProxy.sol:IdentityRegistryProxy"
    });

    await hre.run("verify:verify", {
        address: process.env.BSCTEST_SP0_TOKEN,
        constructorArguments: [process.env.BSCTEST_TREXIMPLEMENTATIONAUTHORITY, process.env.BSCTEST_SP0_IR, 
            process.env.BSCTEST_SP0_MC, "SP0", "SP0", 18, ZEROADDR],
        contract: "contracts/proxy/TokenProxy.sol:TokenProxy"
    });


};

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});