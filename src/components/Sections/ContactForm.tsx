import React, { useState } from 'react'

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section className="relative w-full overflow-hidden bg-black py-24 md:py-32">
      {/* Background Glow Effects */}
      <div className="absolute right-1/4 top-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[rgba(96,165,250,0.15)] to-[rgba(147,51,234,0.15)] blur-[400px]"></div>
      <div className="absolute left-1/4 bottom-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[rgba(167,139,250,0.15)] to-[rgba(147,51,234,0.15)] blur-[400px]"></div>
      
      <div className="relative container mx-auto px-6 z-10">
        <div className="mx-auto max-w-[1737px]">
          {/* Modern Section Header */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Get in Touch
            </h2>
            <div
              className="mx-auto mb-6 h-1 w-32 rounded-full"
              style={{
                background: 'linear-gradient(to right, #60A5FA, #9333EA)',
              }}
            ></div>
            <p className="text-xl text-white/90 md:text-2xl">
              Let's collaborate and create something amazing. Get in touch!
            </p>
          </div>

          {/* Modern Form Container */}
          <div className="relative mx-auto max-w-[1737px]">
            <div
              className="relative rounded-3xl overflow-hidden p-[2px]"
              style={{
                background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #9333EA)',
                boxShadow: '0 20px 60px rgba(96, 165, 250, 0.3)',
              }}
            >
              <div
                className="relative rounded-3xl p-8 md:p-12 bg-black/80 backdrop-blur-xl"
                style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                }}
              >

                {/* Modern Form Content */}
                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-primary-blue-accent"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-primary-blue-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Your Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-primary-blue-accent"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-primary-blue-accent resize-none"
                    />
                  </div>

                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      className="rounded-xl px-12 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                        boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      Send Message →
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm

