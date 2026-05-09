export type Profile = {
  id: string;
  full_name: string | null;
  username: string | null;
  role: "student" | "admin" | "mentor";
  xp: number;
  tryhackme_username: string | null;
  picoctf_username: string | null;
};

export type Lab = {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  points: number;
  description: string | null;
  objective: string | null;
  defensive_lesson: string | null;
  is_published: boolean;
};

export type Submission = {
  id: string;
  answer: string;
  is_correct: boolean;
  created_at: string;
  lab_id: string;
  user_id: string;
};
