export interface Plan {
    id: string;
    name: string;
    interval: string;
    amount: number;
    currency: string;
    features: string[];
}

export const availablePlans: Plan[] = [
    {
        id: "basic",
        name: "Basic Plan",
        interval: "monthly",
        amount: 9.99,
        currency: "USD",
        features: ["Basic meal plans", "Weekly updates", "Email support"],
    },
    {
        id: "premium",
        name: "Premium Plan",
        interval: "monthly",
        amount: 19.99,
        currency: "USD",
        features: ["Advanced meal plans", "Daily updates", "Priority support", "Custom recipes"],
    },
    {
        id: "pro",
        name: "Pro Plan",
        interval: "monthly",
        amount: 29.99,
        currency: "USD",
        features: [
            "Professional meal plans",
            "Real-time updates",
            "24/7 support",
            "Custom recipes",
            "Nutritionist consultation",
        ],
    },
];
  