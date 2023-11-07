import HttpError from '@wasp/core/HttpError.js';
import type { RelatedObject } from '@wasp/entities';
import type { GetRelatedObjects } from '@wasp/queries/types';
import type { Book } from '@wasp/entities';
import type { Resource } from '@wasp/entities';
import type { GetBooks } from '@wasp/queries/types';
import type { GetResources } from '@wasp/queries/types';


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


type GetBooksInput = {
  page: number;
  limit: number;
  sort?: string;
  searchTerm?: string;
};

type GetBooksOutput = {
  books: Book[];
  totalBooks: number;
};

export const getBooks: GetBooks<GetBooksInput, GetBooksOutput> = async ({ page, limit, sort = 'DESC', searchTerm = '' }, context) => {
  if (!context.user) {
    throw new HttpError(401);  // Unauthorized
  }

  // Calculate the offset (i.e., how many items to skip) based on the page and limit
  const skip = (page - 1) * limit;

  // Fetch books from the database with pagination, sorting, and search
  const books = await context.entities.Book.findMany({
    skip,        
    take: limit,
    orderBy: { ...{ createdAt: sort === 'DESC' ? 'desc' : 'asc' }},
    where: {
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { author: { contains: searchTerm, mode: 'insensitive' } },
        { chapters: { some: { title: { contains: searchTerm, mode: 'insensitive' } } } },
        // Extend this logic to search chapters' text/description if needed
      ]
    }
  });

  // Count the total number of books in the database based on the search term
  const totalBooks = await context.entities.Book.count({
    where: {
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { author: { contains: searchTerm, mode: 'insensitive' } },
        { chapters: { some: { title: { contains: searchTerm, mode: 'insensitive' } } } },
      ]
    }
  });

  return {
    books,
    totalBooks
  };
};

type GetResourcesInput = {
  page: number;
  limit: number;
  sort?: 'asc' | 'desc';
  searchTerm?: string;
};

type GetResourcesOutput = {
  resources: Resource[];
  totalResources: number;
};

export const getResources: GetRelatedObjects<GetResourcesInput, GetResourcesOutput> = async ({ page, limit, sort = 'desc', searchTerm = '' }, context) => {
  if (!context.user) {
    throw new HttpError(401, 'Unauthorized'); // User must be logged in to view resources
  }

  // Calculate the offset (i.e., how many items to skip) based on the page and limit
  const skip = (page - 1) * limit;

  // Fetch resources from the database with pagination, sorting, and search
  const resources = await context.entities.Resource.findMany({
    skip,        
    take: limit,
    orderBy: { createdAt: sort },
    where: {
      userId: context.user.id,
      AND: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { tags: { some: { title: { contains: searchTerm, mode: 'insensitive' } } } },
        // Add additional search fields if necessary
      ],
    },
    include: {
      tags: true, // Include related tags in the result
    },
  });

  // Count the total number of resources in the database based on the search term
  const totalResources = await context.entities.Resource.count({
    where: {
      userId: context.user.id,
      AND: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { tags: { some: { title: { contains: searchTerm, mode: 'insensitive' } } } },
        // Add additional search fields if necessary
      ],
    }
  });

  return {
    resources,
    totalResources
  };
};

