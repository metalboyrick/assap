import { Button } from "@/components/ui/button";

export function RevenueModelSection() {
  return (
    <section id="pricing" className="py-24 lg:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A90E2]/30 to-transparent"></div>
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium backdrop-blur-sm mb-4">
            <span className="flex h-2 w-2 rounded-full bg-[#4A90E2] mr-2"></span>
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
            Revenue Model
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {[
            {
              title: "Cost per verification score",
              description:
                "Pay only for what you use with our simple per-verification pricing model.",
              price: "$0.10 - $1.00",
              unit: "per verification",
              buttonText: "Get Started",
            },
            {
              title: "Enterprise subscriptions",
              description:
                "Full customization options for large organizations with high-volume verification needs.",
              price: "Custom",
              unit: "contact for pricing",
              buttonText: "Contact Sales",
            },
          ].map((plan, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C00000] to-[#4A90E2] rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-black/80 p-8 rounded-2xl h-full flex flex-col border border-white/10 group-hover:border-transparent transition duration-300">
                <h3 className="text-2xl font-bold mb-6">{plan.title}</h3>
                <p className="text-lg text-zinc-300 mb-8">{plan.description}</p>
                <div className="mb-10">
                  <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C00000] to-[#4A90E2]">
                    {plan.price}
                  </p>
                  <p className="text-base text-zinc-500">{plan.unit}</p>
                </div>
                <Button className="w-full py-6 bg-gradient-to-r from-[#C00000] to-[#4A90E2] hover:opacity-90 transition-opacity text-white border-none text-lg mt-auto">
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
