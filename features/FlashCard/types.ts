export interface Flashcard {
  id: string
  front: string
  back: string
  difficulty?: "easy" | "medium" | "hard"
  color?: string
}

export interface Language {
  name: string
  speech: string
  flag: string
}

export interface ColorTheme {
  bg: string
  border: string
  accent: string
  hover: string
}

