/**
 * ByteBench - Laptop Database & Review Data
 */
const LAPTOPS_DATA = [
  {
    id: "macbook-pro-16",
    title: "Apple MacBook Pro 16",
    subtitle: "M4 Max (16-Core CPU, 40-Core GPU)",
    brand: "Apple",
    category: "creator",
    categoryLabel: "Creator & Workstation",
    badge: "Editor's Choice 2026",
    badgeType: "gold",
    price: 3499,
    priceFormatted: "$3,499",
    overallScore: 9.8,
    scores: {
      performance: 9.9,
      display: 9.9,
      battery: 9.8,
      build: 9.7,
      value: 8.8
    },
    image: "./assets/images/macbook-pro.jpg",
    specs: {
      processor: "Apple M4 Max (16-core CPU)",
      graphics: "40-core GPU with Ray Tracing",
      ram: "48GB Unified Memory",
      storage: "1TB Ultra-Fast PCIe Gen4 SSD",
      display: "16.2\" Liquid Retina XDR (3456x2234), 120Hz ProMotion, 1,600 nits peak HDR",
      battery: "22 Hours (100Wh)",
      weight: "2.14 kg (4.7 lbs)",
      ports: "3x Thunderbolt 5, HDMI 2.1, SDXC card slot, MagSafe 3, 3.5mm headphone jack",
      os: "macOS Sequoia"
    },
    benchmarks: {
      cinebenchR24Multi: 1820,
      geekbench6Multi: 22800,
      batteryWebHours: 21.5,
      noiseDecibels: 28,
      temperatureMaxC: 78
    },
    verdict: {
      headline: "The undisputed king of mobile workstation performance and endurance.",
      summary: "Apple's M4 Max pushes power efficiency to uncharted territory. Even when rendering complex 8K ProRes sequences on battery power, it maintains peak performance without thermal throttling or loud fan noise.",
      pros: [
        "Extraordinary power efficiency with zero performance loss on battery",
        "Best-in-class 16.2\" Liquid Retina XDR display with 1600-nit highlights",
        "Over 21 hours of real-world battery run time in our lab tests",
        "Superb 6-speaker spatial audio sound system with studio quality mics"
      ],
      cons: [
        "Steep price point and non-upgradeable unified memory/storage",
        "AAA gaming library still playing catch up to Windows ecosystems",
        "Heavier than 14-inch counterparts"
      ],
      idealFor: "Professional video colorists, 3D artists, machine learning researchers, and power users who need uncompromised performance away from a desk."
    },
    userReviews: [
      {
        name: "Marcus Vance",
        date: "2 days ago",
        rating: 5,
        comment: "Exporting 4K RED RAW footage without plugging into the wall still feels like science fiction. Keyboard travel is crisp and the speakers make external monitors feel inadequate."
      },
      {
        name: "Elena Rostova",
        date: "1 week ago",
        rating: 5,
        comment: "Upgraded from an M1 Max. The compiling speed for our massive Rust codebase decreased by 42%. Absolutely worth every penny for engineers."
      }
    ]
  },
  {
    id: "aorus-master-16x",
    title: "AORUS Master 16X",
    subtitle: "Intel Core i9-14900HX • RTX 4090 (175W TGP)",
    brand: "AORUS",
    category: "gaming",
    categoryLabel: "High-End Gaming",
    badge: "Maximum FPS Monster",
    badgeType: "accent",
    price: 2899,
    priceFormatted: "$2,899",
    overallScore: 9.5,
    scores: {
      performance: 10.0,
      display: 9.4,
      battery: 6.8,
      build: 9.3,
      value: 8.9
    },
    image: "./assets/images/gaming-laptop.jpg",
    specs: {
      processor: "Intel Core i9-14900HX (24 cores, 32 threads, up to 5.8 GHz)",
      graphics: "NVIDIA GeForce RTX 4090 Laptop GPU (16GB GDDR6, 175W max TGP)",
      ram: "32GB DDR5-5600MHz (Dual Channel, expandable to 64GB)",
      storage: "2TB PCIe 4.0 NVMe SSD (dual M.2 slots available)",
      display: "16.0\" QHD+ (2560x1600) 240Hz, 3ms, 100% sRGB, NVIDIA G-Sync, Pantone Validated",
      battery: "6.5 Hours (99.9Wh)",
      weight: "2.38 kg (5.25 lbs)",
      ports: "Thunderbolt 4, USB 3.2 Gen2 Type-C, 2x USB 3.2 Gen2 Type-A, HDMI 2.1, 2.5G RJ-45 LAN, Audio combo",
      os: "Windows 11 Pro"
    },
    benchmarks: {
      cinebenchR24Multi: 1680,
      geekbench6Multi: 18450,
      batteryWebHours: 6.2,
      noiseDecibels: 47,
      temperatureMaxC: 84
    },
    verdict: {
      headline: "Desktop-grade gaming dominance packed into a razor-sharp 16-inch chassis.",
      summary: "When you want max settings with path tracing on 2026 AAA releases, the AORUS Master 16X unleashes the full 175W potential of the RTX 4090 backed by Windforce Infinity vapor-chamber cooling.",
      pros: [
        "Top-tier frame rates in all modern titles (98+ FPS in Cyberpunk at 1440p Ultra RT)",
        "Stunning 240Hz 3ms G-Sync display with zero tearing or ghosting",
        "Comprehensive I/O including 2.5G Ethernet and Thunderbolt 4",
        "Generous dual M.2 storage upgrade slots"
      ],
      cons: [
        "Fans get loud under maximum Turbo gaming profiles (47 dB)",
        "Substantial 330W charging brick adds travel weight",
        "Average battery life for non-gaming productivity tasks"
      ],
      idealFor: "Competitive esports athletes, hardcore gamers demanding ray tracing, and 3D animators needing CUDA acceleration."
    },
    userReviews: [
      {
        name: "Jaxson Briggs",
        date: "3 days ago",
        rating: 5,
        comment: "Plays Black Myth Wukong and Cyberpunk with full path tracing at locked frame rates. Vapor chamber cooling actually keeps palm rests cool!"
      },
      {
        name: "Chloe Chen",
        date: "2 weeks ago",
        rating: 4,
        comment: "Brilliant machine. Just make sure to use headphones during intense gaming sessions because the fans definitely announce themselves."
      }
    ]
  },
  {
    id: "zenith-xps-14",
    title: "Zenith XPS 14 OLED",
    subtitle: "Intel Core Ultra 7 155H • 3.2K 120Hz Touch",
    brand: "Zenith",
    category: "ultrabook",
    categoryLabel: "Ultraportable",
    badge: "Best Ultraportable",
    badgeType: "cyan",
    price: 1699,
    priceFormatted: "$1,699",
    overallScore: 9.4,
    scores: {
      performance: 8.9,
      display: 9.8,
      battery: 9.3,
      build: 9.9,
      value: 9.1
    },
    image: "./assets/images/oled-ultrabook.jpg",
    specs: {
      processor: "Intel Core Ultra 7 155H (16 Cores, integrated Intel AI Boost NPU)",
      graphics: "Intel Arc Graphics (8 Xe-cores)",
      ram: "32GB LPDDR5x 7467 MT/s",
      storage: "1TB PCIe Gen4 NVMe SSD",
      display: "14.5\" 3.2K (3200x2000) OLED Touchscreen, 120Hz VRR, 100% DCI-P3, 500 nits, Dolby Vision",
      battery: "14.5 Hours (69.5Wh)",
      weight: "1.18 kg (2.60 lbs)",
      ports: "3x Thunderbolt 4 / USB-C, MicroSD card reader, 3.5mm combo audio",
      os: "Windows 11 Home"
    },
    benchmarks: {
      cinebenchR24Multi: 940,
      geekbench6Multi: 13200,
      batteryWebHours: 13.8,
      noiseDecibels: 31,
      temperatureMaxC: 74
    },
    verdict: {
      headline: "The pinnacle of minimalist luxury and OLED visual brilliance.",
      summary: "Crafted from seamless CNC-machined aerospace aluminum with a concealed haptic glass trackpad and invisible capacitive touch function keys, the XPS 14 feels like hardware sent back from 2030.",
      pros: [
        "Jaw-dropping 3.2K OLED display with ink-like blacks and 100% DCI-P3 coverage",
        "Ultralight at just 1.18kg, slides effortless into any messenger bag",
        "Smooth haptic feedback trackpad with flawless palm rejection",
        "Nearly 14 hours of continuous productivity battery life"
      ],
      cons: [
        "Zero legacy USB-A ports (dongles needed for older flash drives)",
        "Capacitive top function row lacks physical tactile click",
        "Light gaming only on integrated Arc graphics"
      ],
      idealFor: "Mobile executives, software developers on the go, writers, and creative professionals who prize design elegance and screen accuracy."
    },
    userReviews: [
      {
        name: "Samantha Reed",
        date: "Yesterday",
        rating: 5,
        comment: "The OLED panel is simply mesmerizing. Colors pop with incredible depth, and typing on the zero-lattice keyboard is surprisingly satisfying."
      },
      {
        name: "Devin K.",
        date: "5 days ago",
        rating: 4,
        comment: "Build quality rivals Apple. Extremely silent under normal office workloads. Wish it came with at least one USB-A, but USB-C is the future anyway."
      }
    ]
  },
  {
    id: "forge-carbon-17",
    title: "Forge Carbon Pro 17",
    subtitle: "AMD Ryzen 9 7945HX • RTX 4080 • Dual Screen",
    brand: "Forge",
    category: "creator",
    categoryLabel: "Creator & Workstation",
    badge: "Dual-Display Studio",
    badgeType: "purple",
    price: 3199,
    priceFormatted: "$3,199",
    overallScore: 9.6,
    scores: {
      performance: 9.8,
      display: 9.7,
      battery: 7.2,
      build: 9.6,
      value: 8.7
    },
    image: "./assets/images/creator-workstation.jpg",
    specs: {
      processor: "AMD Ryzen 9 7945HX (16 Cores, 32 Threads, 64MB L3 Cache)",
      graphics: "NVIDIA GeForce RTX 4080 Studio (12GB GDDR6)",
      ram: "64GB DDR5-5200MHz Dual Channel",
      storage: "2TB + 2TB RAID 0 PCIe Gen4 SSD",
      display: "Primary: 17.3\" 4K Mini-LED 165Hz (1000 nits) | Secondary: 14\" ScreenPad Plus (3840x1100) 120Hz Touch",
      battery: "7.0 Hours (90Wh)",
      weight: "2.65 kg (5.84 lbs)",
      ports: "2x USB 4 (40Gbps), 2x USB 3.2 Gen2, HDMI 2.1, Full-size SD Express 7.0, 2.5G LAN",
      os: "Windows 11 Pro Studio Edition"
    },
    benchmarks: {
      cinebenchR24Multi: 1740,
      geekbench6Multi: 19100,
      batteryWebHours: 6.8,
      noiseDecibels: 36,
      temperatureMaxC: 80
    },
    verdict: {
      headline: "The ultimate multi-tasking titan for video editors and VFX artists.",
      summary: "By lifting a full-width secondary touch panel angled naturally toward the user, the Forge Carbon Pro 17 turns timeline scrubbing, mixer routing, and reference monitoring into a tactile delight.",
      pros: [
        "Groundbreaking dual-screen workflow increases timeline productivity drastically",
        "Massive 64GB DDR5 RAM handles multiple heavy Adobe & DaVinci projects simultaneously",
        "Full-sized high-speed SD Express 7.0 slot for instant camera dump",
        "Color-calibrated Delta-E < 1 factory report included"
      ],
      cons: [
        "Heavy at 2.65kg, best suited for desk-to-desk relocation",
        "Forward-positioned keyboard requires using the included magnetic wrist rest",
        "High power consumption with both displays running at maximum brightness"
      ],
      idealFor: "Colorists, YouTube content directors, 3D environment artists, and audio mastering engineers."
    },
    userReviews: [
      {
        name: "Julian Brooks",
        date: "4 days ago",
        rating: 5,
        comment: "Having timeline clips and audio meters permanently pinned on the bottom screen while the top 4K Mini-LED shows full-res grading is pure bliss."
      }
    ]
  },
  {
    id: "aurabook-horizon-14",
    title: "AuraBook Horizon 14",
    subtitle: "AMD Ryzen 7 8840HS • 16GB RAM • AI Engine",
    brand: "AuraBook",
    category: "student",
    categoryLabel: "Student & Budget",
    badge: "Best Value Champion",
    badgeType: "green",
    price: 799,
    priceFormatted: "$799",
    overallScore: 9.1,
    scores: {
      performance: 8.7,
      display: 8.6,
      battery: 9.7,
      build: 8.9,
      value: 9.9
    },
    image: "./assets/images/student-laptop.jpg",
    specs: {
      processor: "AMD Ryzen 7 8840HS (8 cores, 16 threads, AMD Ryzen AI)",
      graphics: "AMD Radeon 780M Integrated Graphics",
      ram: "16GB LPDDR5 6400MHz",
      storage: "512GB PCIe Gen4 NVMe SSD (user-upgradeable)",
      display: "14.0\" FHD+ (1920x1200) IPS, 16:10, 400 nits, Anti-glare, 100% sRGB",
      battery: "16.5 Hours (65Wh)",
      weight: "1.25 kg (2.75 lbs)",
      ports: "2x USB-C (USB PD 3.0), 2x USB-A 3.2, HDMI 2.1 TMDS, 3.5mm headphone, microSD",
      os: "Windows 11 Home"
    },
    benchmarks: {
      cinebenchR24Multi: 870,
      geekbench6Multi: 11400,
      batteryWebHours: 16.5,
      noiseDecibels: 25,
      temperatureMaxC: 69
    },
    verdict: {
      headline: "Unbeatable stamina and everyday agility without breaking the bank.",
      summary: "For students and cost-conscious remote professionals, the AuraBook Horizon 14 delivers marathon 16+ hour battery life, a stellar typing experience, and snappy Ryzen 8000 series responsiveness at a fraction of flagship prices.",
      pros: [
        "Astonishing 16.5 hours of continuous campus battery endurance",
        "Deep 1.5mm key travel makes writing essays and thesis papers a joy",
        "Generous port selection including traditional USB-A and HDMI",
        "Whisper quiet cooling that barely spins up in lectures"
      ],
      cons: [
        "Speakers have clear mids but limited low-end bass",
        "Display is 60Hz instead of high refresh rate",
        "512GB base storage may need an upgrade down the line"
      ],
      idealFor: "College students, high schoolers, freelance copywriters, and anyone needing a reliable daily driver under $800."
    },
    userReviews: [
      {
        name: "Maya Patel",
        date: "3 days ago",
        rating: 5,
        comment: "Left my charger in the dorm all day during back-to-back 8-hour lectures, came back at night with 48% battery remaining. Truly a lifesaver!"
      },
      {
        name: "Liam O'Connor",
        date: "1 week ago",
        rating: 5,
        comment: "The keyboard is so much better than the mushy keyboards on other $700 laptops. Boots up in under 5 seconds."
      }
    ]
  },
  {
    id: "titan-360-flip",
    title: "Titan 360 Flip Stylus",
    subtitle: "Intel Core Ultra 7 • 2.8K OLED Touch • 2-in-1",
    brand: "Titan",
    category: "convertible",
    categoryLabel: "2-in-1 Convertible",
    badge: "Best Stylus Hybrid",
    badgeType: "accent",
    price: 1349,
    priceFormatted: "$1,349",
    overallScore: 9.3,
    scores: {
      performance: 8.8,
      display: 9.6,
      battery: 9.1,
      build: 9.5,
      value: 9.0
    },
    image: "./assets/images/convertible-laptop.jpg",
    specs: {
      processor: "Intel Core Ultra 7 155U (12 Cores, 4.8 GHz Turbo)",
      graphics: "Intel Graphics (4 Xe Cores)",
      ram: "16GB LPDDR5x 6400 MT/s",
      storage: "1TB PCIe Gen4 NVMe SSD",
      display: "14.0\" 2.8K (2880x1800) OLED 120Hz Touchscreen, 360-degree geared hinge, 500 nits HDR",
      battery: "13.0 Hours (68Wh)",
      weight: "1.34 kg (2.95 lbs)",
      ports: "2x Thunderbolt 4, 1x USB 3.2 Type-A, 3.5mm combo, MicroSD",
      os: "Windows 11 Home (with Pen & Ink Studio)"
    },
    benchmarks: {
      cinebenchR24Multi: 790,
      geekbench6Multi: 11100,
      batteryWebHours: 12.8,
      noiseDecibels: 27,
      temperatureMaxC: 71
    },
    verdict: {
      headline: "The most versatile sketch-to-laptop companion with frictionless 360 hinge.",
      summary: "Transition instantly from typing reports in clamshell mode to presenting in tent mode, or flip completely flat into tablet mode with 4,096 levels of active pressure stylus support.",
      pros: [
        "Effortless 360-degree rotation with zero hinge wobble when tapping the screen",
        "Included active stylus with 9ms ultra-low latency feels like natural paper",
        "Vibrant 2.8K 120Hz OLED screen with pitch blacks and vivid color tones",
        "Solid 13-hour battery ensures full day unplugged versatility"
      ],
      cons: [
        "Glossy screen has reflections under direct harsh outdoor sunlight",
        "A bit heavier to hold one-handed in tablet mode compared to standalone tablets",
        "U-series chip prioritizing battery over prolonged heavy rendering"
      ],
      idealFor: "Digital illustrators, UI designers, architecture students, and consultants taking handwritten notes in meetings."
    },
    userReviews: [
      {
        name: "Kenji Sato",
        date: "6 days ago",
        rating: 5,
        comment: "The stylus palm rejection in Photoshop and OneNote is rock solid. Folding it into tent mode for watching movies in bed is my favorite feature."
      }
    ]
  }
];

// Benchmark Reference baseline averages
const BENCHMARK_AVERAGES = {
  cinebenchR24Multi: 1100,
  batteryWebHours: 11.5,
  noiseDecibels: 38
};

// Quiz questions
const QUIZ_QUESTIONS = [
  {
    id: "usecase",
    title: "What is your primary use case?",
    options: [
      { value: "creator", label: "Video Editing, 3D Art & Heavy Rendering", icon: "🎬" },
      { value: "gaming", label: "Hardcore Gaming & High-FPS Esports", icon: "🎮" },
      { value: "ultrabook", label: "Executive Travel & Lightweight Mobility", icon: "✈️" },
      { value: "student", label: "College, Lectures & Budget Productivity", icon: "🎓" },
      { value: "convertible", label: "Drawing, Note-Taking & Stylus Versatility", icon: "✏️" }
    ]
  },
  {
    id: "budget",
    title: "What is your target budget range?",
    options: [
      { value: "budget", label: "Under $1,000 (Maximum Value)", icon: "💵" },
      { value: "midrange", label: "$1,000 - $2,000 (Sweet Spot)", icon: "💳" },
      { value: "premium", label: "$2,000+ (No-Compromise Flagship)", icon: "💎" }
    ]
  },
  {
    id: "priority",
    title: "What matters to you the most?",
    options: [
      { value: "battery", label: "All-Day Battery (14+ hours)", icon: "🔋" },
      { value: "performance", label: "Raw GPU & CPU Benchmark Power", icon: "⚡" },
      { value: "display", label: "Stunning OLED / Mini-LED Screen", icon: "🖥️" },
      { value: "portability", label: "Featherweight Portability (< 1.3 kg)", icon: "🪶" }
    ]
  }
];
