import React, { useState } from 'react'

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter submission
    console.log('Newsletter submitted:', email)
    setEmail('')
  }

  return (
    <section className="relative w-full bg-dark-page py-16">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-[855px]">
          <div className="relative rounded-[17px] border-[4px] border-transparent bg-[rgba(255,255,255,0.24)] px-8 py-6 backdrop-blur-sm">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-[17px] border-[4px] border-transparent bg-gradient-to-br from-[rgba(95,165,251,0.6)] via-white to-[rgba(53,81,249,0.6)] opacity-100">
              <div className="h-full w-full rounded-[13px] bg-[rgba(255,255,255,0.24)]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-6 md:flex-row md:justify-between">
              <h3 className="text-lg font-medium text-white/39 md:text-xl">
                NewsLetter
              </h3>
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-1 gap-4 md:w-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-lg bg-transparent px-4 py-2 text-white placeholder:text-white/40 outline-none"
                />
                <button
                  type="submit"
                  className="rounded-[11px] bg-gradient-to-r from-primary-blue-accent via-primary-blue-start to-primary-blue-end px-8 py-2 text-base font-medium text-white transition-all hover:shadow-lg"
                >
                  Newsletter Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter

