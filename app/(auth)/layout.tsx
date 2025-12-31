export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen felx items-center justify-center">
      {children}
    </div>
  )
}
