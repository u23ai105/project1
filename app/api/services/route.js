import { connectDB } from '../../../lib/db';
import Service from '../../../models/Service';

export async function GET(req) {
  await connectDB();

  const url = new URL(req.url);
  const category = url.searchParams.get("category");

  try {
    let query = {};
    if (category && category !== "All") {
      query.category = category;
    }

    console.log('Fetching services for category:', category); // Debug log

    const services = await Service.find(query);
    console.log('Retrieved services:', services); // Debug log

    return new Response(JSON.stringify(services), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching services:', error); // Debug log
    return new Response(JSON.stringify({ error: 'Failed to fetch services' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}