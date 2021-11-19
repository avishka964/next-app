import { MongoClient } from 'mongodb';

//api-new-meetup

//POST /api/new-meetup
async function handler(req, res) {
  if (req.method === 'POST') {

    const database = process.env.DB_URI
    const collection = process.env.DB_COLLECTION
    const data = req.body;

    const client = await MongoClient.connect(`${database}`);
    const db = client.db();

    const meetupsCollection = db.collection(`${collection}`)
    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close();
    res.status(201).json({message: 'Meetup inserted!'})

  }
}

export default handler;
