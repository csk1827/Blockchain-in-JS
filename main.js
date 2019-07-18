const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddr, toAddr, amount){
        this.fromAddr = fromAddr;
        this.toAddr = toAddr;
        this.amount = amount;
    }
}

class Block{
    constructor(timestamp, data, previousHash=''){
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nounce = 0;
    }

    calculateHash(){
        return SHA256(this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nounce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
            this.nounce++;
            this.hash = this.calculateHash();
        }

        console.log('Block mined '+this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningRewards = 100;
    }

    createGenesisBlock(){
        return new Block('01/01/2019', 'Genesis Block', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

   /* addBlock(newBlock){
        //add the previous block's hash to the current block
        newBlock.previousHash = this.getLatestBlock().hash;
        //recalculate the hash for current block
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    } */

    minePendingTransactions(miningRewardsAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined');
        this.chain.push(block);

        this.pendingTransactions = [new Transaction(null, miningRewardsAddress, this.miningRewards)];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.data){
                if(trans.fromAddr === address){
                    balance -= trans.amount;
                }
                if(trans.toAddr === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid(){
        for(let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}


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

cskCoin.createTransaction(new Transaction('addr1', 'addr2', 100));
cskCoin.createTransaction(new Transaction('addr2', 'addr1', 50));

console.log('Starting the miner...');
cskCoin.minePendingTransactions('sais-address');

console.log('Balance of Sai is: '+cskCoin.getBalanceOfAddress('sais-address'));

console.log('Starting the miner again...');
cskCoin.minePendingTransactions('sais-address');

console.log('Balance of Sai is: '+cskCoin.getBalanceOfAddress('sais-address'));