const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

// to test a name pass it as a command line argument using double quotes
// i.e. node client/index "Norman Block"

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const name = process.argv[2];
  // build a proof array (of objects) for this name using getProof
  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof: proof,
    name: name
  });

  console.log({ gift });
}

main();