import { Outlet } from 'react-router'
import { ProtectedLayout } from '~/components/layout/ProtectedLayout'

export default function AppLayout() {
  return (
    <ProtectedLayout>
      <Outlet/>
    </ProtectedLayout>
  )
}
