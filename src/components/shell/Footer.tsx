export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-heading">
          Need a speaker for your event?
        </h2>
        <p className="text-xl md:text-2xl text-neutral-200 mb-8 max-w-3xl mx-auto">
          Our expert consultants are ready to share their knowledge at conferences, workshops, and events worldwide.
        </p>
        <a
          href="mailto:info@zure.com"
          className="inline-block bg-white text-neutral-900 font-bold py-4 px-10 hover:opacity-80 transition-opacity text-lg"
        >
          Contact Us
        </a>
      </div>
    </footer>
  )
}
