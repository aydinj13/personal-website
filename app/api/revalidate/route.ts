// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const body = await req.json()
    
    // Revalidate everything since Sanity is the source of truth
    revalidatePath('/', 'layout')
    
    return Response.json({
      revalidated: true,
      now: Date.now()
    })
  } catch (err) {
    console.error(err)
    return Response.json({ message: 'Error revalidating' }, { status: 500 })
  }
}