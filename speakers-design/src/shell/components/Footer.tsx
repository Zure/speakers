export function Footer() {
  return (
    <footer className="bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Need a speaker for your event?
        </h2>
        <p className="text-xl md:text-2xl text-neutral-200 dark:text-neutral-700 mb-8 max-w-3xl mx-auto">
          Our expert consultants are ready to share their knowledge at conferences, workshops, and events worldwide.
        </p>
        <a
          href="mailto:speakers@zure.com"
          className="inline-block bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 font-bold py-4 px-10 hover:opacity-80 transition-opacity text-lg"
        >
          Contact Us
        </a>
      </div>
    </footer>
  )
}
