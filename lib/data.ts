import {
  Brain, Shield, Globe, Terminal, Fingerprint, Lock, Network,
  Search, Cloud, FileText, Trophy, Users, CreditCard, Upload,
  Gauge, Bot, Flag, Swords, BookOpen, BarChart3
} from "lucide-react";

export const paths = [
  { title: "Beginner Foundation", icon: BookOpen, level: "Start here", lessons: 54, labs: 36, description: "Cybersecurity terms, Linux, HTTP, networking, safe lab habits, and CTF thinking." },
  { title: "Web Security", icon: Globe, level: "Core", lessons: 88, labs: 92, description: "OWASP Top 10, SQLi, XSS, auth bugs, API issues, JWT, SSRF, and file upload." },
  { title: "Digital Forensics", icon: Fingerprint, level: "Core", lessons: 39, labs: 44, description: "Logs, memory, metadata, disk images, timelines, phishing headers, and evidence reports." },
  { title: "Reverse Engineering", icon: Terminal, level: "Advanced", lessons: 42, labs: 47, description: "Strings, binaries, crackmes, debugging basics, static analysis, and malware behavior theory." },
  { title: "Cryptography", icon: Lock, level: "Core", lessons: 31, labs: 38, description: "Encoding, hashing, RSA, weak randomness, XOR, classical ciphers, and CTF crypto." },
  { title: "Network Analysis", icon: Network, level: "Core", lessons: 46, labs: 51, description: "Wireshark thinking, flows, DNS, ports, beaconing, scanning, and protocol analysis." },
  { title: "OSINT", icon: Search, level: "Core", lessons: 28, labs: 33, description: "Public clues, usernames, metadata, domains, maps, archive trails, and reporting." },
  { title: "Cloud & DevSecOps", icon: Cloud, level: "Professional", lessons: 34, labs: 42, description: "Cloud misconfigs, CI/CD secrets, containers, IaC scanning, and secure deployment." },
];

export const rooms = [
  { name: "Suspicious USB Investigation", category: "Forensics", labs: 12, level: "Medium", files: "images, logs, csv, metadata", focus: "Investigation case + report writing" },
  { name: "Web Auth Breakers", category: "Web", labs: 18, level: "Core", files: "requests, source, tokens", focus: "Auth flaws, JWT, IDOR, session logic" },
  { name: "Network Beacon Hunt", category: "Network", labs: 9, level: "Medium", files: "pcap summaries, flows, dns", focus: "Detect command-and-control style patterns" },
  { name: "Crypto Encoding Chain", category: "Crypto", labs: 10, level: "Beginner", files: "txt, blobs, hashes", focus: "Encoding, hashing, XOR, key reuse" },
  { name: "Reverse Warmups", category: "Reverse", labs: 8, level: "Advanced", files: "bin, dat, strings", focus: "Static inspection and simple binary logic" },
  { name: "OSINT Archive Trail", category: "OSINT", labs: 7, level: "Beginner", files: "mock profiles, robots, archive notes", focus: "Public-source investigation method" },
];

export const labs = [
  { title: "Blue Noise LSB", room: "Suspicious USB Investigation", difficulty: "Hard", points: 450, files: 1, stage: "Investigate", description: "Extract hidden data from an image channel and explain the evidence path." },
  { title: "Access Timeline", room: "Suspicious USB Investigation", difficulty: "Hard", points: 420, files: 1, stage: "Report", description: "Correlate failed and successful access events and build a professional incident note." },
  { title: "Trusting The Client", room: "Web Auth Breakers", difficulty: "Medium", points: 280, files: 1, stage: "Defend", description: "Decode a mock token, find the broken trust model, and write the defensive fix." },
  { title: "Leaky Source Map", room: "Web Auth Breakers", difficulty: "Hard", points: 420, files: 2, stage: "Investigate", description: "Analyze leaked source map artifacts and identify exposed application logic." },
  { title: "Beacon Hunter", room: "Network Beacon Hunt", difficulty: "Medium", points: 300, files: 1, stage: "Investigate", description: "Find repeated suspicious outbound connections from flow summaries." },
  { title: "One Byte Wall", room: "Crypto Encoding Chain", difficulty: "Medium", points: 300, files: 2, stage: "Learn", description: "Recover a single-byte XOR key using known flag prefix and decrypt a blob." },
];

export const adminCards = [
  { title: "Users", value: "24,892", icon: Users },
  { title: "Labs", value: "426", icon: Flag },
  { title: "Reports", value: "8,104", icon: FileText },
  { title: "Payments", value: "$18.4K", icon: CreditCard },
  { title: "Tournaments", value: "36", icon: Trophy },
  { title: "Uploads", value: "2.1TB", icon: Upload },
  { title: "AI Sessions", value: "91K", icon: Bot },
  { title: "Risk Logs", value: "168", icon: Shield },
];

export const features = [
  { title: "AI Mentor", icon: Brain, text: "Staged hints, mistake explanation, bilingual help, and no direct flag leaking." },
  { title: "Dynamic Flags", icon: Flag, text: "Per-user flags planned through backend validation to stop answer sharing." },
  { title: "Report System", icon: FileText, text: "Medium and hard labs require evidence, impact, fix, and lessons learned." },
  { title: "Skill Tree", icon: Gauge, text: "Unlock skills by finishing prerequisites instead of drowning users in random labs." },
  { title: "Team Tournaments", icon: Swords, text: "Live events with scoreboard freeze, attempt limits, and anti-cheat logs." },
  { title: "Lab Builder", icon: Upload, text: "Admin can create rooms, labs, files, hints, walkthroughs, points, and publish states." },
];

export const leaderboard = [
  ["0xFaris", "4,820 XP"],
  ["cyber_lynx", "4,410 XP"],
  ["RootFalcon", "3,990 XP"],
  ["blue_guard", "3,320 XP"],
  ["hex_byte", "3,020 XP"],
];

export const securityEvents = [
  ["Failed login limit reached", "user_184", "Blocked", "2 min ago"],
  ["New lab published", "admin", "Success", "18 min ago"],
  ["Video linked to lab", "mentor_02", "Success", "41 min ago"],
  ["Suspicious IP rate limited", "185.x.x.x", "Flagged", "1 hour ago"],
];
