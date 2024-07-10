import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr"
import wallet from './wallet.json'


const umi = createUmi('https://api.devnet.solana.com')
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet))
const signer = createSignerFromKeypair(umi, keypair)
umi.use(signerIdentity(signer))

const uploader = createBundlrUploader(umi);
 
(async()=>{
  const imageUrl =
    'https://arweave.net/A0XCUuDIh_iDJBuUdimrT4OdBXgNlqnm86Q-OIus61E'

  const metadata = {
    name: 'Akarsu Mask',
    symbol: 'AKRS',
    description: 'Akarsu Mask',
    image: imageUrl,
    attributes: [
      {
        trait_type: 'color',
        value: 'black',
      },
      {
        trait_type: 'rarity',
        value: '1',
      },
    ],
    properties: {
      files: [
        {
          uri: imageUrl,
          type: 'image/png',
        },
      ],
    },
  }
  const myNewUrl = await uploader.uploadJson(metadata)
  console.log(myNewUrl) //https://arweave.net/zg8dVvoEkKlmNENVGiW2rkgSIoxUykexryeD--bgOQw
})()