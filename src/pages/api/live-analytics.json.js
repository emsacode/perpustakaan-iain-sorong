import { ddagApi } from '../../utils/ddagApi.js';

export async function GET() {
  try {
    const response = await ddagApi.getAnalytics();
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
