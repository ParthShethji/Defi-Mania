import { Reclaim } from '@reclaimprotocol/js-sdk'
import { useState } from'react'
import QRCode from "react-qr-code";

import './App.css'

function App() {
  const [url, setUrl] = useState('')


  const generateVerificationRequest = async () => {
    const APP_ID = "";
    const reclaimClient = new Reclaim.ProofRequest(APP_ID);
    const APP_SECRET =""  // your app secret key.
    
    
    const providerIds = [
    '285a345c-c6a6-4b9f-9e1e-23432082c0a8', // Coinbase Completed KYC
  '8a7f0989-c4d9-4528-ac82-a46abaa3c564', // Groww - Verified KYC
  '2b22db5c-78d9-4d82-84f0-a9e0a4ed0470', // Binance KYC Level
  '5c1738b0-0fa6-49d7-86be-d5fa28cc02a5', // Aadhaar Anon 
    ];

    await reclaimClient.buildProofRequest(providerIds[3])


    reclaimClient.setSignature(
        await reclaimClient.generateSignature(APP_SECRET)
    )

    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest()
    setUrl(requestUrl)


    await reclaimClient.startSession({
      onSuccessCallback: proof => {
        console.log('Verification success', proof)
        const data = proof.claimData.context.extractedParameters
        console.log(data)

        // Your business logic here
      },
      onFailureCallback: error => {
        console.error('Verification failed', error)
        // Your business logic here to handle the error
      }
    })

    
};





// call when user clicks on a button
// onClick={getVerificationReq}





  return (
    <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "50vh" }}>
      {!url && (
        <button onClick={generateVerificationRequest}>
          Create Claim QrCode
        </button>
      )}
      {url && (
        <QRCode value={url} />
      )}
    </div>
    </>
  )
}

export default App
