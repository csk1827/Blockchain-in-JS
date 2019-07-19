const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

let cskCoin = new Blockchain();
/* cskCoin.addBlock(new Block('16/7/2019', {amount:4}));
cskCoin.addBlock(new Block('18/7/2019', {amount:10}));

console.log(JSON.stringify(cskCoin, null, 4));
console.log('Is blockchain valid? '+ cskCoin.isChainValid());

cskCoin.chain[1].data = {amount: 100};
cskCoin.chain[1].hash = cskCoin.chain[1].calculateHash();

console.log('Is blockchain valid? '+ cskCoin.isChainValid());

console.log('Mining block 1...');
cskCoin.addBlock(new Block('16/7/2019', {amount:15}))

console.log('Mining block 2...');
cskCoin.addBlock(new Block('18/7/2019', {amount:60})); */

/* cskCoin.addTransaction(new Transaction('addr1', 'addr2', 100));
cskCoin.addTransaction(new Transaction('addr2', 'addr1', 50));

console.log('Starting the miner...');
cskCoin.minePendingTransactions('sais-address');

console.log('Balance of Sai is: '+cskCoin.getBalanceOfAddress('sais-address'));

console.log('Starting the miner again...');
cskCoin.minePendingTransactions('sais-address');

console.log('Balance of Sai is: '+cskCoin.getBalanceOfAddress('sais-address')); */

const myKey = ec.keyFromPrivate('4cef2cb5a2d245c693eebf828b1549bca817279f8ead0bd527fd3d21cf46726c');
const myWalletAddress = myKey.getPublic('hex');

const tx1 = new Transaction(myWalletAddress, 'public key of receiver', 10);
tx1.signTransaction(myKey);
cskCoin.addTransaction(tx1);

console.log('Startingthe miner...');
cskCoin.minePendingTransactions(myWalletAddress);

console.log('Balance of Sai is '+cskCoin.getBalanceOfAddress(myWalletAddress));

console.log('Is chain valid? ', cskCoin.isChainValid());

console.log(JSON.stringify(cskCoin, null, 4));

