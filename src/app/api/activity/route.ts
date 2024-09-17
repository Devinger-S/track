export async function POST(request: Request) {
  const formData = await request.json()
  console.log(formData)
//   const name = formData.get('name')
//   const email = formData.get('email')
  return Response.json({})
}