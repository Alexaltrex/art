export interface ISendEmail {
    name: string
    from: string // вебсайт или компания
    email: string
    idea?: string
    brief?: string // I’d like to discuss
    budget?: string
}
