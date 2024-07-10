import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"

import wallet from './wallet.json'
import { createSignerFromKeypair, publicKey, signerIdentity } from "@metaplex-foundation/umi"
import { CreateMetadataAccountV3InstructionAccounts, CreateMetadataAccountV3InstructionArgs, DataV2Args, createMetadataAccountV3 } from "@metaplex-foundation/mpl-token-metadata"

(async()=>{
const umi = createUmi('https://api.devnet.solana.com')
const keypair=umi.eddsa.createKeypairFromSecretKey(new Uint8Array (wallet))
const mint = publicKey('6DcvCPMZsbY7RRU3CYnF513nt1ASj9Fp64X2bujrozZT')//bu adrese önceden oluşturulmuş tokenin extra bilgilerini vereceğiz.
const signer=createSignerFromKeypair(umi,keypair)
umi.use(signerIdentity(signer))//umi nin signere kullanması için yazıyoruz.


const accounts:CreateMetadataAccountV3InstructionAccounts={
    mint,
    mintAuthority:signer

}

const data:DataV2Args={
    name:'Akarsu',
    symbol:'AKR',
    collection:null,//nft olmadığı için null
    creators:null,//nft olmadığı için null
    sellerFeeBasisPoints:500,//token her el değiştirdiğinde fee alırsın istersen
    uri:'https://arweave.net/1234',
    uses:null
}
const args:CreateMetadataAccountV3InstructionArgs={
    data,
    collectionDetails:null,
    isMutable:true
}
const tx=createMetadataAccountV3(umi,{
    ...accounts,
    ...args
})

const result =await tx.sendAndConfirm(umi).then((res)=>{
    console.log(res.signature.toString())
})

})()