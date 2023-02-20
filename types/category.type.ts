export interface ICategory {
    id: string
    name: string
}

export type CategoryCreateType = Omit<ICategory, "id">
