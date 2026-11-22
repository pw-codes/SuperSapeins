// All data is FICTIONAL demo data. Replace with API services later (keep these types).
export type Athlete = {
  id: string;
  name: string;
  sport: string;
  country: string;
  position: string;
  age: number;
  score: number;
  growth: number;
  stage: string;
  trending: boolean;
  verified: boolean;
  achievement: string;
  photo: string;
  bio: string;
};
export type NewsArticle = {
  id: string;
  title: string;
  cat: string;
  desc: string;
  source: string;
  date: string;
  mins: number;
  athleteId: string;
  body: string[];
};
export const SPORTS = [
  "Football",
  "Basketball",
  "Tennis",
  "Athletics",
  "Swimming",
  "Cricket",
  "Kabaddi",
  "Badminton",
];
export const COUNTRIES = ["India"];
const POS: Record<string, string[]> = {
  Football: ["Midfielder", "Winger", "Striker"],
  Basketball: ["Guard", "Forward", "Centre"],
  Tennis: ["Singles", "Singles", "Doubles"],
  Athletics: ["Sprinter", "Middle distance", "Jumper"],
  Swimming: ["Freestyle", "Butterfly", "Backstroke"],
  Cricket: ["Batter", "Bowler", "All-rounder"],
  Kabaddi: ["Raider", "Defender", "All-rounder"],
  Badminton: ["Singles", "Singles", "Doubles"],
};
const STATES = [
  "Maharashtra",
  "Punjab",
  "Haryana",
  "Tamil Nadu",
  "Karnataka",
  "Kerala",
  "Delhi",
  "West Bengal",
  "Gujarat",
  "Odisha",
  "Telangana",
  "Assam",
];
const ACH = [
  "State youth championship",
  "Season top performer",
  "Personal best set",
  "National camp selection",
  "Breakthrough season",
  "Junior national medal",
];
const N = [
  "Arjun Sharma",
  "Ishaan Reddy",
  "Vivaan Patel",
  "Aarav Singh",
  "Reyansh Nair",
  "Aditya Iyer",
  "Krish Menon",
  "Kabir Bhat",
  "Vihaan Joshi",
  "Shaurya Rao",
  "Atharva Kulkarni",
  "Neil Das",
  "Dhruv Kapoor",
  "Yash Verma",
  "Sai Prakash",
  "Rohan Chatterjee",
  "Arnav Gupta",
  "Karan Malhotra",
  "Dev Mishra",
  "Ritvik Yadav",
  "Mayank Deshmukh",
  "Siddharth Naidu",
  "Pranav Pillai",
  "Anirudh Sen",
];
export const athletes: Athlete[] = N.map((name, i) => {
  const sport = SPORTS[i % SPORTS.length],
    age = 17 + ((i * 7) % 13);
  return {
    id: `a${i + 1}`,
    name,
    sport,
    country: "India",
    position: POS[sport][i % 3],
    age,
    score: 68 + ((i * 37) % 30),
    growth: Math.round(((i * 53) % 180) - 30) / 10,
    stage: age < 20 ? "Youth" : age < 24 ? "Emerging" : "Professional",
    trending: i % 4 === 0,
    verified: i % 6 === 0,
    achievement: `${ACH[i % 6]} (demo)`,
    photo: "",
    bio: `${name} is a fictional Indian athlete from ${STATES[i % STATES.length]}, created for the ATHLETIX prototype. Nothing here is a real record.`,
  };
});
export const series = (seed: number, n = 90) => {
  let v = 50 + (seed % 20);
  return Array.from({ length: n }, (_, i) => ({
    d: `D${i + 1}`,
    v: Math.round((v += Math.sin(i * 0.7 + seed) * 2 + 0.25) * 10) / 10,
  }));
};
export const seedOf = (id: string) => parseInt(id.slice(1));
const ARTICLE_TITLES = [
  "Indian youth academies report record talent scouting",
  "Indian sprint prospects improve seasonal personal bests",
  "Basketball guards lead a new Indian rookie generation",
  "Indian swimming relay squads back rising teenagers",
  "Indian tennis juniors climb the national rankings",
  "Indian cricket all-rounders attract national attention",
  "Football academies develop the next Indian wingers",
  "How Indian performance scores are calculated",
];
export const news: NewsArticle[] = Array.from({ length: 8 }, (_, i) => ({
  id: `n${i + 1}`,
  title: ARTICLE_TITLES[i],
  cat: SPORTS[i % SPORTS.length],
  desc: "Fictional Indian sports news for the ATHLETIX prototype.",
  source: "ATHLETIX India Desk",
  date: `2026-11-${String(20 - i).padStart(2, "0")}`,
  mins: 3 + (i % 5),
  athleteId: `a${i * 3 + 1}`,
  body: [
    "This is fictional demonstration content created for ATHLETIX. It does not describe real events, results or people.",
    "The story focuses on Indian grassroots programmes, structured coaching and the growing pathways available to young athletes across the country.",
    "Use these articles as layout previews only. For a live platform, replace this section with verified reporting and licensed Indian sports coverage.",
  ],
}));
export const contracts = Array.from({ length: 8 }, (_, i) => ({
  id: `c${i + 1}`,
  athleteId: `a${i * 3 + 1}`,
  type: ["Performance-linked", "Development", "Endorsement"][i % 3],
  price: 4000 + i * 1500,
  change: Math.round(((i * 41) % 120) - 30) / 10,
  months: 12 + (i % 4) * 6,
  risk: ["Low", "Medium", "High"][i % 3],
  sold: 40 + i * 7,
}));
export const notifs = [
  ["Arjun Sharma posted a new performance score", "2h ago"],
  ["Contract c3 price moved (simulated)", "5h ago"],
  [
    "New article: Indian youth academies report record talent scouting",
    "1d ago",
  ],
  ["Ishaan Reddy was added to trending", "1d ago"],
  ["Your weekly Indian sports digest is ready", "3d ago"],
  ["Welcome to ATHLETIX India", "5d ago"],
].map(([t, w], i) => ({ id: `x${i + 1}`, t, w }));
export const formatINR = (n: number) =>
  `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
