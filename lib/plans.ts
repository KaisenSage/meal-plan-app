export interface Plan {
    id: string;
    name: string;
    interval: string;
    amount: number;
    currency: string;
    features: string[];
    description: string;
    isPopular: boolean;
  }
  
  export const availablePlans: Plan[] = [
    {
      id: "basic",
      name: "Basic Plan",
      interval: "weekly",
      amount: 9.99,
      currency: "USD",
      features: ["Basic meal plans", "Weekly updates", "Email support"],
      description: "Perfect for getting started with basic meal planning.",
      isPopular: false,
    },
    {
      id: "premium",
      name: "Premium Plan",
      interval: "monthly",
      amount: 19.99,
      currency: "USD",
      features: ["Advanced meal plans", "Daily updates", "Priority support", "Custom recipes"],
      description: "Great for foodies who want variety and customization.",
      isPopular: true,
    },
    {
      id: "pro",
      name: "Pro Plan",
      interval: "yearly",
      amount: 299.99,
      currency: "USD",
      features: [
        "Professional meal plans",
        "Real-time updates",
        "24/7 support",
        "Custom recipes",
        "Nutritionist consultation",
      ],
      description: "Ultimate plan for professionals and serious planners.",
      isPopular: false,
    },
  ];
  