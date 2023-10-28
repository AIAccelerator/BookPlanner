import HttpError from '@wasp/core/HttpError.js';
import type { RelatedObject } from '@wasp/entities';
import type { GetRelatedObjects } from '@wasp/queries/types';
import type { Book } from '@wasp/entities';
import type { GetBooks } from '@wasp/queries/types';


export const getRelatedObjects: GetRelatedObjects<void, RelatedObject[]> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.RelatedObject.findMany({
    where: {
      user: {
        id: context.user.id
      }
    },
  })
}

// Define the input type for pagination parameters
type PaginationInput = {
  page: number;
  limit: number;
};


type PaginationOutput = {
  books: Book[];
  totalBooks: number;
};

export const getBooks: GetBooks<PaginationInput, PaginationOutput> = async ({ page, limit }, context) => {
  if (!context.user) {
    throw new HttpError(401);  // Unauthorized
  }

  // Calculate the offset (i.e., how many items to skip) based on the page and limit
  const skip = (page - 1) * limit;

  // Fetch books from the database with pagination
  const books = await context.entities.Book.findMany({
    skip,        // Skip the previous pages' items
    take: limit, // Limit the number of items returned
  });

  // Count the total number of books in the database
  const totalBooks = await context.entities.Book.count();

  return {
    books,
    totalBooks
  };
};
