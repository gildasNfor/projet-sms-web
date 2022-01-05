import { Request, Response } from "express"
// const TeleSignSDK = require("telesignsdk")
import axios from "axios"

export const sendSMS = async (req: Request, res: Response) => {
  const { message, phoneNo } = req.body

  const response: any = await axios.post(
    "http://proxysms.mufoca.com/api/v0/shortMessages",
    {
      phoneNumber: phoneNo,
      message: message,
    },
    {
      headers: {
        Authorization:
          "Basic ZjE2MTg3ZGE3MGI2OmI2OTAxZDQwLWYyMTEtOTMwYS04ZTBjLTFjZGFkN2E2NGY5OQ==",
        "Content-Type": "application/json",
      },
    }
  )

  console.log(response)
  return response
}

// const customerId = "6D676198-D861-45DE-A4FF-F0F497788D05"
// const apiKey =
//   "d2C3HZQf9TbcAyEQo8cYoWjY8FzbVGVTncuiHox6l/Li9nzHGwlutpKJx13ek0BRJSXfvx13EW2qLmieac+M7w=="
// const rest_endpoint = "https://rest-api.telesign.com"
// const timeout = 10 * 1000 // 10 secs

// const client = new TeleSignSDK(
//   customerId,
//   apiKey,
//   rest_endpoint,
//   timeout // optional
//   // userAgent
// )

// const messageType = "ARN"

// console.log("## MessagingClient.message ##")

// function messageCallback(
//   error: string | null,
//   responseBody: { [x: string]: { [x: string]: any } }
// ) {
//   if (error === null) {
//     console.log(
//       `Messaging response for messaging phone number: ${phoneNo}` +
//         ` => code: ${responseBody["status"]["code"]}` +
//         `, description: ${responseBody["status"]["description"]}`
//     )
//     res.redirect(307, "/messages")
//   } else {
//     console.error("Unable to send message. " + error)
//   }
// }
// client.sms.message(messageCallback, phoneNo, message, messageType)
