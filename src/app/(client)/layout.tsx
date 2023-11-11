import Layout from '@/components/Layout/Layout'
import Preloader from '@/components/Preloader'
import api from '@/services/api'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { data: navData, error } = await api.navigations.findMany();

  return (
    <Layout navData={navData}>
      {children}
    </Layout>
  )
}
