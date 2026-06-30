// app/api/data/route.js
import clientPromise from '@/app/lib/mongodb';

function getIpAddress(req) {
    // Vercel sets this header for the real client IP
    const forwarded = req.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim(); // first IP in the chain is the client
    }
    return req.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(req) {
  try {
    const body = await req.json();
    const ip = getIpAddress(req);

    if (!body || Object.keys(body).length === 0) {
      return Response.json({ error: 'Request body is empty' }, { status: 400 });
    }

    const client = await clientPromise();
    const db = client.db(process.env.MONGODB_DB_NAME);
    console.log('BODY ::',body);
    const collection = db.collection('items');

    const result = await collection.insertOne({
      ...body,
      ip,
      createdAt: new Date(),
    });

    return Response.json(
      { success: true, insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('MongoDB insert error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
    try {
      const client = await clientPromise();
      const db = client.db(process.env.MONGODB_DB_NAME);
      const data = await db.collection('items').find({}).sort({ createdAt: -1 }).toArray();
  
      return Response.json(data);
    } catch (error) {
      console.error('MongoDB fetch error:', error);
      return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}