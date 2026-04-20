export type Role = 'tank' | 'damage' | 'support'

export interface Hero {
  id: string
  name: string
  role: Role
  portrait: string
}

export type HeroProgress = Record<string, number>
