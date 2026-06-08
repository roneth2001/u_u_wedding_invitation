import { Suspense } from 'react'
import InvitationContent from './InvitationContent'
export const dynamic = "force-dynamic";
export default function InvitationPage() {
  return (
    <Suspense fallback={null}>
      <InvitationContent />
    </Suspense>
  )
}