// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  body?: string
  error?: string;
  url?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method !== 'POST') return res.status(404).json({ error: 'endpoint does not exist'})
  const request_body = JSON.parse(req.body)
  if(!request_body.url) return res.status(400).json({ error: 'url not defined in body'})
  const webRes = await fetch(request_body.url);
  const body = await webRes.text();

  return res.status(200).json({ body })
}
