import Layout from '@/components/Layout/Layout'
import Preloader from '@/components/Preloader'
import { ThemeProvider } from '@/components/Providers/Providers';
import api from '@/services/api'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { data: navData, error } = await api.navigations.findMany();

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      // disableTransitionOnChange
    >
      <Layout navData={navData}>
        {children}
      </Layout>
    </ThemeProvider>
  )
}
