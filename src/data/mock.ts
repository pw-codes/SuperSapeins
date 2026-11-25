// Super Sapein prototype data: collected through a Google Form survey.
// This file retains the existing application types while providing verified survey entries.
export type Athlete = {
  id: string;
  name: string;
  sport: string;
  category: string;
  country: string;
  state: string;
  city: string;
  position: string;
  expertise: string[];
  ageRange: string;
  age: number;
  score: number;
  growth: number;
  stage: string;
  trending: boolean;
  verified: boolean;
  achievement: string;
  photo: string;
  bio: string;
  surveySource: string;
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
export const TALENT_FIELDS = [
  "Accounts & Audit",
  "Audit",
  "Chartered Accountancy",
  "Chess",
  "Communication",
  "Content Creation",
  "Content Writing",
  "Critical Thinking",
  "Entrepreneurship",
  "Handball",
  "Marketing",
  "Photography",
  "Problem Solving",
  "Public Speaking",
  "Teaching",
  "Transfer Pricing",
].sort((a, b) => a.localeCompare(b));
export const SPORTS = [...TALENT_FIELDS].sort((a, b) => a.localeCompare(b));
export const TALENT_CATEGORIES = [
  "Business",
  "Communication",
  "Finance",
  "Literary Arts",
  "Media",
  "Performing Arts",
  "Sports",
  "Teaching",
].sort((a, b) => a.localeCompare(b));
export const COUNTRIES = ["India"];
export const INDIAN_STATES = ["Assam", "Karnataka", "Maharashtra"].sort(
  (a, b) => a.localeCompare(b),
);

const SURVEY_SOURCE = "Google Form survey conducted by Super Sapein";

const surveyAthletes: Omit<
  Athlete,
  | "id"
  | "score"
  | "growth"
  | "stage"
  | "trending"
  | "verified"
  | "achievement"
  | "photo"
  | "surveySource"
>[] = [
  {
    name: "Prasanna",
    sport: "Audit",
    category: "Finance",
    country: "India",
    state: "Maharashtra",
    city: "Panvel",
    position: "Audit and public speaking",
    expertise: ["Audit", "Public Speaking", "Chess", "Puzzle"],
    ageRange: "22–26",
    age: 24,
    bio: "Prasanna is a Super Sapein respondent with interests in audit, public speaking, chess and puzzles.",
  },
  {
    name: "Rishikesh Gupta",
    sport: "Accounts & Audit",
    category: "Finance",
    country: "India",
    state: "Maharashtra",
    city: "Nagpur",
    position: "Accounts and audit",
    expertise: ["Accounts", "Audit"],
    ageRange: "22–26",
    age: 24,
    bio: "Rishikesh Gupta is a Super Sapein respondent specializing in accounts and audit.",
  },
  {
    name: "Om Keskar",
    sport: "Public Speaking",
    category: "Communication",
    country: "India",
    state: "Not specified",
    city: "Not specified",
    position: "Communication and anchoring",
    expertise: [
      "Public Speaking",
      "Communication",
      "Anchoring",
      "Elocution",
      "Storytelling",
    ],
    ageRange: "18–22",
    age: 20,
    bio: "Om Keskar is a Super Sapein respondent with expertise in public speaking, communication, anchoring, elocution and storytelling.",
  },
  {
    name: "Hardik Patel",
    sport: "Transfer Pricing",
    category: "Finance",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    position: "Transfer pricing",
    expertise: ["Transfer Pricing"],
    ageRange: "22–26",
    age: 24,
    bio: "Hardik Patel is a Super Sapein respondent with expertise in transfer pricing.",
  },
  {
    name: "Jugal",
    sport: "Content Creation",
    category: "Media",
    country: "India",
    state: "Maharashtra",
    city: "Nashik",
    position: "Camera and stage presence",
    expertise: ["Content Creation", "Camera Presence", "Stage Confidence"],
    ageRange: "22–26",
    age: 24,
    bio: "Jugal is a Super Sapein respondent with strengths in content creation, camera presence and stage confidence.",
  },
  {
    name: "Labdhi",
    sport: "Chartered Accountancy",
    category: "Finance",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    position: "Entrepreneurship",
    expertise: ["Chartered Accountancy", "Entrepreneurship"],
    ageRange: "26+",
    age: 27,
    bio: "Labdhi is a Super Sapein respondent with experience in chartered accountancy and entrepreneurship.",
  },
  {
    name: "Arpita Jangid",
    sport: "Marketing",
    category: "Business",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    position: "Marketing",
    expertise: ["Marketing"],
    ageRange: "18–22",
    age: 20,
    bio: "Arpita Jangid is a Super Sapein respondent with expertise in marketing.",
  },
  {
    name: "Dev Shah",
    sport: "Teaching",
    category: "Teaching",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    position: "Teaching CA students",
    expertise: ["Teaching CA Students"],
    ageRange: "22–26",
    age: 24,
    bio: "Dev Shah is a Super Sapein respondent who teaches CA students.",
  },
  {
    name: "Arijit Ghosh",
    sport: "Content Writing",
    category: "Literary Arts",
    country: "India",
    state: "Karnataka",
    city: "Bangalore",
    position: "Content writing and creation",
    expertise: ["Content Writing", "Content Creation"],
    ageRange: "18–22",
    age: 20,
    bio: "Arijit Ghosh is a Super Sapein respondent with expertise in content writing and content creation.",
  },
  {
    name: "Darshi Gada",
    sport: "Audit",
    category: "Finance",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    position: "Article Assistant at BDO India",
    expertise: ["Audit", "Article Assistant at BDO India"],
    ageRange: "18–22",
    age: 20,
    bio: "Darshi Gada is a Super Sapein respondent and an Article Assistant at BDO India.",
  },
  {
    name: "Rohit Tanaji Pasalkar",
    sport: "Problem Solving",
    category: "Communication",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    position: "Critical thinking",
    expertise: ["Critical Thinking", "Practical Problem Solving"],
    ageRange: "18–22",
    age: 20,
    bio: "Rohit Tanaji Pasalkar is a Super Sapein respondent with strengths in critical thinking and practical problem solving.",
  },
  {
    name: "Sejal Zawar",
    sport: "Photography",
    category: "Media",
    country: "India",
    state: "Maharashtra",
    city: "Jalgaon",
    position: "Photography and writing",
    expertise: ["Photography", "Content Ideation", "Writing", "Poetry"],
    ageRange: "18–22",
    age: 20,
    bio: "Sejal Zawar is a Super Sapein respondent interested in photography, content ideation, writing and poetry.",
  },
  {
    name: "Krushna Pawar",
    sport: "Handball",
    category: "Sports",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    position: "Centre Back",
    expertise: ["Handball – Centre Back"],
    ageRange: "22–26",
    age: 24,
    bio: "Krushna Pawar is a Super Sapein respondent who plays handball as a centre back.",
  },
  {
    name: "Riddhi Kolhapure",
    sport: "Communication",
    category: "Communication",
    country: "India",
    state: "Maharashtra",
    city: "Kolhapur",
    position: "Communication and confidence",
    expertise: ["Communication", "Self-Confidence"],
    ageRange: "26+",
    age: 27,
    bio: "Riddhi Kolhapure is a Super Sapein respondent with expertise in communication and self-confidence.",
  },
  {
    name: "Ipshita Bukhredia",
    sport: "Content Creation",
    category: "Media",
    country: "India",
    state: "Assam",
    city: "Sivasagar",
    position: "Content and drawing",
    expertise: ["Content Creation", "Drawing", "Interest in Finance"],
    ageRange: "18–22",
    age: 20,
    bio: "Ipshita Bukhredia is a Super Sapein respondent interested in content creation, drawing and finance.",
  },
  {
    name: "Uday Sanklecha",
    sport: "Accounts & Audit",
    category: "Finance",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    position: "Accounting and finance",
    expertise: ["Accounting", "Finance"],
    ageRange: "18–22",
    age: 20,
    bio: "Uday Sanklecha is a Super Sapein respondent with interests in accounting and finance.",
  },
];

export const athletes: Athlete[] = surveyAthletes.map((entry, i) => ({
  id: `a${i + 1}`,
  ...entry,
  score: 68 + ((i * 7) % 24),
  growth: 1.2 + ((i * 3) % 9) * 0.5,
  stage:
    entry.ageRange === "18–22"
      ? "Youth"
      : entry.ageRange === "26+"
        ? "Professional"
        : "Emerging",
  trending: i % 4 === 0,
  verified: true,
  achievement: entry.expertise.join(" · "),
  photo: "",
  surveySource: SURVEY_SOURCE,
}));
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
export const news: NewsArticle[] = athletes.slice(0, 8).map((athlete, i) => ({
  id: `n${i + 1}`,
  title: `${athlete.name}: ${athlete.expertise.slice(0, 2).join(" and ")}`,
  cat: athlete.sport,
  desc: `Super Sapein survey profile highlighting ${athlete.expertise.join(", ")}.`,
  source: SURVEY_SOURCE,
  date: "2026-11-25",
  mins: 2,
  athleteId: athlete.id,
  body: [
    `${athlete.name} was listed in the Google Form survey as a Super Sapein respondent.`,
    `Reported interests or expertise: ${athlete.expertise.join(", ")}.`,
    `${athlete.city !== "Not specified" ? `Reported location: ${athlete.city}, ${athlete.state}.` : "A city and state were not specified in the survey."} Reported age range: ${athlete.ageRange}.`,
    "This prototype presents survey data as entered. The profile does not verify qualifications, achievements or employment.",
  ],
}));
export const contracts = athletes.slice(0, 8).map((athlete, i) => ({
  id: `c${i + 1}`,
  athleteId: athlete.id,
  type: ["Development", "Profile showcase", "Community opportunity"][i % 3],
  price: 4000 + i * 1500,
  change: 0,
  months: 12,
  risk: "Prototype only",
  sold: 0,
}));
export const notifs = athletes.slice(0, 6).map((athlete, i) => ({
  id: `x${i + 1}`,
  t: `${athlete.name} is included in the Super Sapein survey results`,
  w: i === 0 ? "Just added" : `${i + 1}d ago`,
}));
export const formatINR = (n: number) =>
  `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
