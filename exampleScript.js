// Example script to deploy the SimpleStorage.json smart contract

let fs = require("fs");
let Web3 = require('web3'); // https://www.npmjs.com/package/web3

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

console.log("Deploying the contract");

async function deploy() {

    let source = fs.readFileSync("SimpleStorage.json");
    let contracts = JSON.parse(source);;
    let abi = contracts.abi;
    let code = contracts.bytecode;
    // Create Contract proxy class
    let SampleContract = new web3.eth.Contract(abi);

    SampleContract
        .deploy({
            data: code,
            arguments: []
        })
        .send({
            from: '0xb9a2f7a42869ac0035814bc6a1bec217b0bbfef0',
            gas: 1500000,
            gasPrice: '30000000000000'
        }, function (error, transactionHash) {
            if (error)
                console.log('Error on fire deploy', error);
            console.log('Deploy fired! Transaction hash: ', transactionHash);
        })
        .on('error', function (error) { })
        .on('transactionHash', function (transactionHash) { })
        .on('receipt', function (receipt) {
            console.log(receipt.contractAddress) // contains the new contract address
        })
        .on('confirmation', function (confirmationNumber, receipt) { })
        .then(function (newContractInstance) {
            console.log(newContractInstance.options.address) // instance with the new contract address
        });

}

deploy().then(() => console.log('finish'));