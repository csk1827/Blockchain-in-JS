const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(timestamp, data, previousHash=''){
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block('01/01/2019', 'Genesis Block', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        //add the previous block's hash to the current block
        newBlock.previousHash = this.getLatestBlock().hash;
        //recalculate the hash for current block
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}


let cskCoin = new Blockchain();
cskCoin.addBlock(new Block('16/7/2019', {amount:4}));
cskCoin.addBlock(new Block('18/7/2019', {amount:10}));

console.log(JSON.stringify(cskCoin, null, 4));