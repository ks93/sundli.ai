interface PageContainerProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function PageContainer({
  children,
  title,
  description,
}: PageContainerProps) {
  return (
    <div className="reading page">
      <header className="page-header">
        <h1>{title}</h1>
        {description && <p className="lede">{description}</p>}
      </header>
      {children}
    </div>
  )
}
