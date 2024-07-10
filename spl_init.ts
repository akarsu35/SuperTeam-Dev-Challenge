import { Connection, Keypair } from "@solana/web3.js"
import wallet from './wallet.json'
import { createMint } from "@solana/spl-token"
(async()=>{
  const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))
  const connection = new Connection(
    'https://api.devnet.solana.com',
    'confirmed'
  )
  const mint = await createMint(connection, keypair, keypair.publicKey, null, 6)
  console.log('mint is: ' + mint) //6DcvCPMZsbY7RRU3CYnF513nt1ASj9Fp64X2bujrozZT    bu oluşturulan token adresi
})()