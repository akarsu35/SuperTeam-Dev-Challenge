import { Connection, Keypair, PublicKey } from '@solana/web3.js'

import wallet from './wallet.json'
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token'
import { keypairPayer } from '@metaplex-foundation/umi'
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))
const connection = new Connection('https://api.devnet.solana.com')
const mint = new PublicKey('6DcvCPMZsbY7RRU3CYnF513nt1ASj9Fp64X2bujrozZT') //hangi token
const to = new PublicKey('8LUUKXKq14e762mjS5H5QzKhcKGtbJr3XBoyFVrZhZ26') //nereye
;(async () => {
  const from_ata = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    keypair.publicKey
  );

  const to_ata = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    to
  )

  const tx=await transfer(
    connection,
    keypair,
    from_ata.address,
    to_ata.address,
    keypair.publicKey,
    10000000
  );

  console.log('tx bilgisi: '+tx)
})()
