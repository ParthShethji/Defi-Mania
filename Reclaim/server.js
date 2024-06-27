import { Reclaim } from '@reclaimprotocol/js-sdk'


const sessionId = random() // we recommend using uuid.v4()


router.get('/request-proofs', () => {
    const reclaimClient = new Reclaim.ProofRequest(
      'YOUR_APPLICATION_ID_HERE',
      sessionId
    ) //TODO: replace with your applicationId
    await reclaimClient.addContext(
      (`user's address`),
      ('for acmecorp.com on 1st january')
    )
   
    // id of the provider you want to generate the proof for
    await reclaimClient.buildProofRequest('PROVIDER_ID')
   
    reclaimClient.setSignature(
      await reclaimClient.generateSignature(
        APP_SECRET //TODO : replace with your APP_SECRET
      )
    )
   
    const {requestUrl, statusUrl} = await reclaimClient.createVerificationRequest();
    res.send('request-proof', {requestUrl, statusUrl})
  });
   