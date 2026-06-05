import { insforge } from '@/lib/insforge';

export async function GET() {
  try {
    const { data, count, error } = await insforge.database
      .from('jobs')
      .select('*', { count: 'exact' })
      .limit(1);

    return Response.json({
      success: true,
      count,
      dataLength: data?.length,
      error,
      sample: data?.[0],
    });
  } catch (err) {
    return Response.json({
      success: false,
      error: String(err),
    }, { status: 500 });
  }
}
