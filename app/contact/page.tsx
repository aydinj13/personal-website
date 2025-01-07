// app/contact/page.tsx
import ContactForm from "@/components/ContactForm"

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-12 md:mb-20">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Have a project in mind? Let&apos;s discuss how we can work together to bring your ideas to life.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Optional Info Section */}
      <div className="container mx-auto px-4 mt-12 md:mt-20">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-gray-600">
            Typically respond within 1-2 business days • Based in United States
          </p>
        </div>
      </div>
    </div>
  )
}