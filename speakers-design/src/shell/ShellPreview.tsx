import { AppShell } from './components'

export default function ShellPreview() {
  const handleNavigate = (path: string) => {
    console.log('Navigate to:', path)
    // In real app: router.push(path)
  }

  return (
    <AppShell onNavigate={handleNavigate}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
            Application Shell Preview
          </h1>
          <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-8">
            This is the shell that wraps all pages of the Zure Speakers website.
          </p>
          <div className="bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-50 p-12 text-center">
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Page content goes here
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
