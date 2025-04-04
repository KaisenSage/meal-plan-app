export interface Plan {
    name: string;
    amount: number;
    currency: string;
    interval: 'week' | 'month' | 'year';
    isPopular?: boolean;
    description: string;
    features: string[];
  }
  
  export const availablePlans: Plan[] = [
    {
      name: "Weekly Plan",
      amount: 9.99,
      currency: "USD",
      interval: "week",
      isPopular: false,
      description: "Great if you want to try the service before committing longer.",
      features: [
        "Unlimited AI meal plans",
        "AI Nutrition Insights",
        "Cancel Anytime",
      ],
    },
    {
      name: "Monthly Plan",
      amount: 39.99,
      currency: "USD",
      interval: "month",
      isPopular: true,
      description: "Perfect for ongoing, month-to-month meal planning and features.",
      features: [
        "Unlimited AI meal plans",
        "AI Nutrition Insights",
        "Cancel Anytime",
      ],
    },
    {
      name: "Yearly Plan",
      amount: 299.99,
      currency: "USD",
      interval: "year",
      isPopular: false,
      description: "Best value for those committed to improving their diet long-term.",
      features: [
        "Unlimited AI meal plans",
        "AI Nutrition Insights",
        "Cancel Anytime",
      ],
    },
  ];
  