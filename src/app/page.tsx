export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">sundli.ai</h1>
      
      <div className="flex flex-col items-center space-y-4">
        <p className="text-muted-foreground">Press <kbd className="px-2 py-1 text-sm rounded bg-secondary text-secondary-foreground">⌘ K</kbd> to start</p>
        
        <div className="flex gap-4">
          <a href="/essays" className="text-sm px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
            Essays
          </a>
          <a href="/projects" className="text-sm px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
            Projects
          </a>
          <a href="/contact" className="text-sm px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
            Contact
          </a>
        </div>
      </div>

      <div className="mt-12 text-sm text-muted-foreground">
        <p>© {currentYear} Kelvin Sundli</p>
      </div>
    </main>
  );
}
