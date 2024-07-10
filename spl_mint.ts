import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import wallet from './wallet.json'
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token'

;(async () => {
  const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))
  const connection = new Connection('https://api.devnet.solana.com')

  const token_decimals = 1_000_000
  const mint = new PublicKey('6DcvCPMZsbY7RRU3CYnF513nt1ASj9Fp64X2bujrozZT')

  const ata = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    keypair.publicKey
  )

  console.log('ATA is: ' + ata.address.toBase58()) //WVV4YiChN1UGrAjmJHvEybTN23nf6BZhuadQ6WNKKdR


  //cüzdanımıza 100 adet Token mint ledik.
  const mintTx = await mintTo(
    connection,
    keypair,
    mint,
    ata.address,
    keypair.publicKey,
    100 * token_decimals
  )
  console.log('mintTX:' + mintTx) //64EcXL8Sn5KYujrt5eS2fTPCA86f3tMJtXfobkgCJBPJPwjU4JNuSpnQJQ3vDJxEjwUK54unkWg3pR4RvwgVNhgq
})()
