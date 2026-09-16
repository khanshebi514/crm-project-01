export const pricingPlans = {
  starter: {
    name: "Starter",

    description: "Perfect for small shops starting their digital journey.",

    pakistan: {
      monthly: 2000,

      yearly: 20000,

      currency: "PKR",

      symbol: "₨",
    },

    international: {
      monthly: 10,

      yearly: 100,

      currency: "USD",

      symbol: "$",
    },

    features: [
      "Product Management",

      "Basic Inventory",

      "Sales Tracking",

      "Excel Import & Export",
    ],
  },

  business: {
    name: "Business",

    description: "For growing businesses that need advanced management.",

    pakistan: {
      monthly: 5000,

      yearly: 50000,

      currency: "PKR",

      symbol: "₨",
    },

    international: {
      monthly: 25,

      yearly: 250,

      currency: "USD",

      symbol: "$",
    },

    features: [
      "Everything in Starter",

      "Advanced Inventory",

      "Reports",

      "Multiple Users",

      "Business Analytics",
    ],
  },
};
