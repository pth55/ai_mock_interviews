export async function POST(request) {
  const response = new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
  response.headers.append(
    "Set-Cookie",
    "session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict"
  );
  return response;
}
