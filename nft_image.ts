import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import wallet from './wallet.json'
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { readFile } from "fs/promises";
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";
import { log } from "console";

const umi=createUmi('https://api.devnet.solana.com')
const keypair=umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet))
const signer= createSignerFromKeypair(umi,keypair)
umi.use(signerIdentity(signer));

const uploader=createBundlrUploader(umi);

(async()=>{
    const file='./batman.png'
    const buffer=await readFile(file)

    const image= createGenericFile(buffer,'batman.png')

    const [imageUrl]=await uploader.upload([image])
    console.log(imageUrl);
    
})()