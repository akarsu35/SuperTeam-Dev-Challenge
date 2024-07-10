import { createSignerFromKeypair, generateSigner, percentAmount, signerIdentity } from "@metaplex-foundation/umi"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import wallet from './wallet.json'
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata"
import bs58 from'bs58'

const umi = createUmi('https://api.devnet.solana.com')
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet))
const signer = createSignerFromKeypair(umi, keypair)
const mint=generateSigner(umi);
umi.use(mplTokenMetadata());
umi.use(signerIdentity(signer));

(async()=>{
  const url = 'https://arweave.net/zg8dVvoEkKlmNENVGiW2rkgSIoxUykexryeD--bgOQw'
  const tx = createNft(umi, {
    mint,
    name: 'Akarsu Mask',
    symbol: 'AKRS',
    uri: url,
    sellerFeeBasisPoints: percentAmount(4),
  })
  const res = await tx.sendAndConfirm(umi)
  console.log(bs58.encode(res.signature)) //5Jqkeu9uShJeTnvEog9HsKu7pKZwLr9q9wJ5VoCwW486zuqadNmqbcmqyiZQdP4zMcUuDsXnZyGScrEYcsUq9hQR
})()
