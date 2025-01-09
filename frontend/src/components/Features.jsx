import { Plane, DollarSign, Shield } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: <Plane className="h-8 w-8 text-blue-600" />,
      title: "Wide Selection",
      description: "Choose from thousands of flights to destinations worldwide",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-blue-600" />,
      title: "Best Prices",
      description: "Get competitive prices and special deals on flights",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Secure Booking",
      description: "Book with confidence using our secure payment system",
    },
  ]

  return (
    <div className="container py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="group relative"
          >
            <div className="absolute inset-0 bg-blue-600/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-300" />
            <div className="relative flex flex-col items-center text-center p-8">
              <div className="size-20 rounded-2xl bg-white shadow-xl shadow-blue-600/10 flex items-center justify-center mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

