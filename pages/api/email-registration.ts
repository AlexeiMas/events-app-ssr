import {NextApiRequest, NextApiResponse} from "next";
import path from "path"
import fs from "fs"
import {IRootData} from "../../types/dataTypes";

function buildPath() {
  return path.resolve(process.cwd(), "data", "data.json")
}

function extractData(filePath: string): IRootData {
  const jsonData = fs.readFileSync(filePath)
  return JSON.parse(jsonData.toString())
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {method} = req

  const filePath = buildPath()
  const {events_categories, allEvents} = extractData(filePath)

  if (!allEvents) {
    return res.status(404).json({message: 'Events data not found'})
  }

  if (method === "POST") {
    const {email, eventId} = req.body

    if (!email || !email.includes('@')) {
      res.status(422).json({message: 'Invalid email address'})
      return;
    }

    const newAllEvents = allEvents.map(ev => {
      if (ev.id === eventId) {
        if (ev.emails_registered.includes(email)) {
          res.status(409).json({message: 'This email has already been registered'})
          return ev
        }
        return {
          ...ev,
          emails_registered: [...ev.emails_registered, email]
        }
      }
      return ev
    })

    fs.writeFileSync(filePath, JSON.stringify({events_categories, allEvents: newAllEvents}))

    res.status(200).json({message: `You has been registered successfully with the email: ${email} for the event: ${eventId}`})
  }
}