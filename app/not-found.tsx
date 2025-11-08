import { Button } from '@/shared/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button className='bg-primary text-white'>
        <Link href="/admin">Return Home</Link>
      </Button>
    </div>
  )
}