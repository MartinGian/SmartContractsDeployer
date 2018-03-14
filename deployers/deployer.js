const Web3 = require('web3');

/**
 * Deployer of smart contracts using web3
 * 
 * @class Deployer
 */
class Deployer {

    constructor(network) {
        // TODO: get the network settings from config file and create new HttpProvider
        this.web3 = new Web3(new Web3.default.providers.HttpProvider('http://localhost:8545'));
    }

    /**
     * Deploy a smart contract with the given parameters. 
     * If any required parameter is missing or are incorrect, throws an exception.
     * 
     * @param {Object} abi JSON interface of the contract
     * @param {string} contract bytecode of the contract
     * @param {Object} deployOptions { from: address, gas: integer, gasPrice: integer }
     * @param {Array} [contractArguments=[]] Arguments of the contract
     */
    async deploy(abi, contract, deployOptions, contractArguments = []) {
        if (!contract)
            throw 'contract param is required';
        if (contractArguments && !Array.isArray(contractArguments))
            throw 'contractArguments param is required and has to be an Array';
        if (!options || !options.from || !options.gas || !options.gasPrice || !Number.isInteger(options.gas) || !Number.isInteger(options.gasPrice))
            throw 'options.from, options.gas and options.gasPrice are required and has to be string and integer respectively';
        if (!this.web3.utils.isAddress(options.from))
            throw 'the given address in the options object is not a valid Eth address';

        const wContract = new this.web3.eth.Contract(abi);
        const deployedContract = await wContract.deploy({ data: contract, arguments: contractArguments }).send({ ...deployOptions });

        // TODO: check which data of the deployed contract the method should return
        return deployedContract.options.address;
    }
}
