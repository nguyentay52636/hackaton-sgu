export interface TranscriptSegment {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  isEditing?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  audioUrl?: string;
  isPlaying?: boolean;
}

export interface AccessibilitySettings {
  fontSize: "small" | "normal" | "large" | "xlarge";
  highContrast: boolean;
  darkMode: boolean;
  ttsVoice: "female_vi" | "male_vi" | "female_en" | "male_en";
  ttsRate: number;
  autoHighlight: boolean;
  language: "vi" | "en";
}

export interface TranscriptSession {
  id: string;
  title: string;
  segments: TranscriptSegment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  transcriptId: string;
  title: string;
  content: string;
  createdAt: Date;
}

export type ChatMode = "simple" | "full";

export type UserRole = "student" | "teacher" | "admin" | "guest";

export type AuthMode = "demo" | "simple" | "professional";

export interface User {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  avatar?: string;
  grade?: string;
  classId?: string;
  specialNeeds?: string[];
  createdAt: Date;
  lastActive: Date;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  teacherId: string;
  studentIds: string[];
  description?: string;
  createdAt: Date;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  classId: string;
  teacherId: string;
  dueDate: Date;
  type: "reading" | "listening" | "speaking" | "writing";
  content: string;
  createdAt: Date;
}

export interface StudentProgress {
  userId: string;
  assignmentId: string;
  status: "not_started" | "in_progress" | "completed";
  score?: number;
  submittedAt?: Date;
  feedback?: string;
}

export interface LearningStats {
  totalSessions: number;
  totalMinutes: number;
  transcriptCount: number;
  chatMessages: number;
  speechPracticeCount: number;
  averageScore?: number;
  achievements: string[];
  weeklyActivity: { day: string; minutes: number }[];
}
