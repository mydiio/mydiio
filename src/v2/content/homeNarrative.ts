export const homeNarrative = {
  identity: {
    definition: "Sri Lanka's first connected passenger information network.",
    tagline: "Every Journey, Connected.",
    explanation: "Installed inside passenger vehicles, funded by advertising and built for people.",
  },

  actOne: {
    purpose: "Introduce what passengers encounter.",
    belief:
      "This is not simply advertising inside a vehicle. It is the visible beginning of a connected passenger network.",
  },

  actTwo: {
    eyebrow: "The connected network",
    headline: "Every vehicle becomes one connected point.",
    scaleLabel: "tuk-tuks already moving through Colombo each day.",
    supporting: "We connect the transport network that already moves the city.",
    statementEyebrow: "Built for people",
    statementLineOne: "Advertising funds the network.",
    statementLineTwo: "People give it purpose.",
  },

  journey: {
    eyebrow: "One journey. Three kinds of value.",
    headline: "Every journey works for everyone.",
    introduction:
      "Passengers receive useful information. Drivers earn more. Businesses reach nearby communities. The network connects all three.",
    steps: [
      {
        id: "journey",
        number: "01",
        title: "A journey begins",
        body: "A passenger enters a connected vehicle.",
        progress: 0.12,
      },
      {
        id: "experience",
        number: "02",
        title: "The screen becomes useful",
        body: "Weather, news and local information become part of the ride.",
        progress: 0.3,
      },
      {
        id: "business",
        number: "03",
        title: "A business joins the journey",
        body: "A relevant campaign reaches people already moving nearby.",
        progress: 0.48,
      },
      {
        id: "trust",
        number: "04",
        title: "The journey is verified",
        body: "The vehicle, location and time are recorded automatically.",
        progress: 0.66,
      },
      {
        id: "value",
        number: "05",
        title: "Value returns to the network",
        body: "Businesses receive proof, drivers earn and passenger content stays funded.",
        progress: 0.82,
      },
    ],
  },

  network: {
    eyebrow: "Built to scale",
    headline: "One platform. Every vehicle.",
    introduction:
      "We begin with tuk-tuks in Colombo. The same core can expand to buses, tour vans and other passenger vehicles as each stage is proven.",
    colomboEyebrow: "Colombo today",
    colomboLabel: "Tuk-tuks already operating across the city each day.",
    nationalEyebrow: "National opportunity",
    nationalLabel: "Three-wheelers operating across Sri Lanka.",
    conclusion: "Every new vehicle strengthens the network.",
  },

  platform: {
    eyebrow: "Five connected products",
    headline: "One platform keeps the whole network moving.",
    introduction:
      "Passengers, drivers, businesses and operations each use a different part of one connected system.",
    products: [
      {
        title: "Passenger screen",
        body: "The information and content passengers experience inside the vehicle.",
      },
      {
        title: "Advertiser portal",
        body: "Campaign creation, scheduling and verified reporting.",
      },
      {
        title: "Driver portal",
        body: "Earnings, schedules, payments and account management.",
      },
      {
        title: "Eagle Eye",
        body: "The operational command centre for the fleet and platform.",
      },
      {
        title: "Public website",
        body: "The entry point for businesses, drivers and partners.",
      },
    ],
  },

  coverage: {
    eyebrow: "Start focused. Expand with proof.",
    headline: "One corridor first. Then one city at a time.",
    introduction:
      "The launch corridor connects Dehiwala, Mount Lavinia and Ratmalana. We prove reliability and value here before expanding further.",
    currentLabel: "Launch corridor",
    futureLabel: "Expansion follows operational proof",
  },

  packages: {
    eyebrow: "The commercial engine",
    headline: "Advertising funds the infrastructure.",
    introduction:
      "Businesses join the network through campaigns that fund connected vehicles, driver income and the passenger experience.",
    supporting: "Choose how your business joins the network.",
  },

  pioneer: {
    eyebrow: "Founding partners",
    headline: "Help build the network from the beginning.",
    introduction:
      "Ten Pioneer businesses receive founding status, full-fleet access and a fixed monthly rate for life.",
    supporting:
      "This is not simply an advertising package. It is a place in the network's founding story.",
  },

  closing: {
    eyebrow: "Every Journey, Connected.",
    headline: "Join the network.",
    introduction: "Businesses fund it. Drivers expand it. Passengers give it purpose.",
    advertiser: "Put your business in motion.",
    driver: "Help build the connected fleet.",
    investor: "Back the infrastructure behind the network.",
  },
} as const;
