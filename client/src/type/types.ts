export type BorrowedByUserType = {
  _id?: string
  book: BooksDocument;
  receivedDate: Date;
  returnedDate: Date;
};

export type User = {
  _id?: any;
  name?: string;
  email?: string;
  borrowedByUser: BorrowedByUserType[];
  joinDate?: Date;
  isAdmin?: boolean;
};

export type BooksDocument = {
  _id?: string;
  name: string;
  publishedYear: number;
  authorName?: AuthorsDocument[];
  quantity: number;
  selectedFile: string;
};
export type BooksDocumentInputType = {
  _id?: string | undefined;
  name: string;
  publishedYear: number;
  authorName?: string[] | undefined;
  quantity: number;
  selectedFile: string;
}

export type BorrowInfoType = {
  bookId: string | undefined;
  userId: string | undefined;
  borrowDate?: Date;
  returnDate?: Date;
};

export type AccessTokenType = {
  token?: any;
  user?: User;
};

export type AuthorsDocument = {
  _id?: string;
  name: string;
  email: string;
  bookId?: string[];
};
