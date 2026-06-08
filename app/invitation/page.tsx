export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from 'react'
import InvitationContent from './InvitationContent'

export default function InvitationPage() {
  return (
    <Suspense fallback={null}>
      <InvitationContent />
    </Suspense>
  )
}