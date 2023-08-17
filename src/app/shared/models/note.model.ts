export interface Note {
  id?: string,
  arrayId?: number,
  bookId: number,
  title: string,
  path: string,
  sync: boolean,
  text: string
}
