import { Keypair } from "@solana/web3.js";


//yeni bir cüzdan oluşturma bu cüzdanın public key ve secretkey oluşturma işlemi aynı zamanda
const kp=Keypair.generate();
console.log('my public key: '+kp.publicKey.toBase58());//GTJFAX2zbYRjEGo3eKUSByJnReAVrn9yRvqAVuF68oee
console.log('my private key: '+kp.secretKey);//  47,44,209,41,176,53,239,165,168,57,65,194,214,105,244,63,5,219,24,187,178,221,133,5,203,211,1,102,47,180,174,22,229,155,231,44,83,53,188,95,190,1,146,109,164,153,26,190,37,136,36,195,127,222,10,78,83,27,102,12,230,3,116,39