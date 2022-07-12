import Books, { BooksDocument } from '../models/Books'
import Users, { BorrowedByUserType } from '../models/Users'
import { NotFoundError } from '../helpers/apiError'
import { isValidObjectId } from 'mongoose'

const create = async (book: BooksDocument): Promise<BooksDocument> => {
  //after saving new book.authorName should populated by Author model
  return book.save().then((book) => book.populate('authorName').execPopulate())
}

const findById = async (bookId: string): Promise<BooksDocument> => {
  const foundBook = await Books.findById(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} is not found`)
  }

  return foundBook
}

const findAll = async (): Promise<BooksDocument[]> => {
  return Books.find().sort({ name: 1 }).populate('authorName')
}

const update = async (
  bookId: string,
  update: Partial<BooksDocument>
): Promise<BooksDocument | null> => {
  const foundBook = await Books.findByIdAndUpdate(bookId, update, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} is not found`)
  }

  return foundBook
}

// Delete Book from book list and delete book from user's borrowed list
const deleteBook = async (bookId: string): Promise<BooksDocument | null> => {
  const foundBook = await Books.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} is not found`)
  }
  const borrowedBookFound = await Users.find(
    {},
    { borrowedByUser: { $elemMatch: { book: foundBook._id } } }
  )

  borrowedBookFound.forEach(async (user) => {
    const newNew = await Users.findByIdAndUpdate(
      { _id: user._id },
      { $pull: { borrowedByUser: { book: foundBook._id } } },
      { new: true }
    )
    await newNew?.save()
  })
  return foundBook
}

const borrowBook = async (
  bookId: string,
  userId: string,
  borrowDate: Date,
  returnDate: Date
) => {
  const userFound = await Users.findById(userId)
  const bookFound = await Books.findById(bookId)

  if (!userFound || !bookFound) {
    throw new NotFoundError('Book or user is not found')
  }

  const bookExists = userFound.borrowedByUser.some((item) => {
    return item.book.toString() === bookId
  })

  if (!bookExists) {
    const borrowBookInfo = {
      book: bookId,
      receivedDate: borrowDate,
      returnedDate: returnDate,
    }
    userFound.borrowedByUser = [...userFound.borrowedByUser, borrowBookInfo]
    userFound.save()
  }
  return userFound
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteBook,
  borrowBook,
}
