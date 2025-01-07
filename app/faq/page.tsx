export default function FAQPage() {
    const faqs = [
      {
        question: "What services do you offer?",
        answer: "I offer web development, design, marketing, and consultation services tailored to your business needs.",
      },
      {
        question: "How do I get started?",
        answer: "You can contact me through the contact form or email to discuss your project details.",
      },
      {
        question: "What is your pricing structure?",
        answer: "Pricing depends on the project scope and requirements. We usually structure a Deposit + Remaining Fee, but it all depends on the situation. Contact me for a detailed quote.",
      },
      {
        question: "Do you offer ongoing support?",
        answer: "Yes, I offer ongoing maintenance and support packages based on your needs.",
      },
    ];
  
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">FAQs</h1>
          <p className="text-center text-gray-600 mb-12">
            Have questions? Here are some of the most frequently asked questions. If you need further assistance, feel free to reach out.
          </p>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-300 bg-white rounded-lg shadow-sm p-5"
              >
                <h2 className="text-lg font-medium text-gray-800 mb-2">{faq.question}</h2>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  