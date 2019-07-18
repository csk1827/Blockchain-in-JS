const SHA256 = require('crypto-js/sha256');

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
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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
cskCoin.addBlock(new Block('16/7/2019', {amount:4}));
cskCoin.addBlock(new Block('18/7/2019', {amount:10}));

console.log(JSON.stringify(cskCoin, null, 4));
console.log('Is blockchain valid? '+ cskCoin.isChainValid());

cskCoin.chain[1].data = {amount: 100};
cskCoin.chain[1].hash = cskCoin.chain[1].calculateHash();

console.log('Is blockchain valid? '+ cskCoin.isChainValid());

console.log('Mining block 1...');
cskCoin.addBlock(new Block('16/7/2019', {amount:15}))

console.log('Mining block 2...');
cskCoin.addBlock(new Block('18/7/2019', {amount:60}));