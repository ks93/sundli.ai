export default function Contact() {
  return (
    <main className="h-full flex flex-col items-center justify-center space-y-8">
      <div className="container max-w-3xl py-10">
        <h1 className="text-4xl font-bold tracking-tight">Get in touch</h1>
        <p className="text-muted-foreground">You can reach us at:</p>
        <ul className="list-disc list-inside">
          <li>Email: kelvin[at]sundli.ai</li>
          <li>Phone: +47 993 44 356</li>
        </ul>
      </div>
    </main>
  );
}
