// Import Next.js API route support
import type { NextApiRequest, NextApiResponse } from 'next'

// Define the shape of the response data
type Data = {
  name: string
}

// Define the handler function to handle incoming requests
export default function handler(
  req: NextApiRequest, // Incoming request object
  res: NextApiResponse<Data> // Response object with a generic type of 'Data'
) {
  // Respond with a status code of 200 (OK) and JSON data containing a name
  res.status(200).json({ name: 'John Doe' })
}
