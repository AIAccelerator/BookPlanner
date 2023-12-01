import HttpError from '@wasp/core/HttpError.js';
import type { RelatedObject } from '@wasp/entities';
import type { GetRelatedObjects } from '@wasp/queries/types';
import type { GetBooks } from '@wasp/queries/types';
import type { GetResources } from '@wasp/queries/types';
import type { Book, Resource, Tag } from '@wasp/entities';
import type { GetTags } from "@wasp/queries/types";
import type { GenerateSasToken } from '@wasp/queries/types';
import { StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } from '@azure/storage-blob';
import moment from 'moment-timezone';

process.env.TZ = 'Europe/Sofia';

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

type GetResourcesOutput = {
  resources: Resource[];
  totalResources: number;
};

type GetResourcesInput = {
  page: number,
  limit: number,
  sort?: string,
  searchTerm?: string,
  tag?: string // Add a new optional parameter for tag filtering
};

export const getResources: GetResources<GetResourcesInput, GetResourcesOutput> = async ({page, limit, sort = 'desc', searchTerm = '', tag =''}, context) => {
  if (!context.user) {
    throw new HttpError(401); // Unauthorized
  }

  const skip = (page - 1) * limit;

  const resources = await context.entities.Resource.findMany({
    skip,        
    take: limit,
    orderBy: { createdAt: sort === 'DESC' ? 'desc' : 'asc' },
    where: {
      user: {
        id: context.user.id
      },
      AND: [
        searchTerm ? {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } }
          ]
        } : {},
        tag ? {
          tags: {
            some: {
              tag: {
                name: { contains: tag, mode: 'insensitive' }
              }
            }
          }
        } : {}
      ]
    },
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    },
  });
    
// Count total resources
const totalResources = await context.entities.Resource.count({
  where: {
    user: {
      id: context.user.id
    },
    AND: [
      searchTerm ? {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } }
        ]
      } : {},
      tag ? {
        tags: {
          some: {
            tag: {
              name: { contains: tag, mode: 'insensitive' }
            }
          }
        }
      } : {}
    ]
  }
});
  
  return { resources, totalResources };
}

type SearchTagsInput = {
  searchTerm: string;
  page: number, 
  limit: number, 
  sort?: string;
};

type SearchTagsOutput = {
  tags: Tag[];
};

export const searchTags: GetTags<SearchTagsInput, SearchTagsOutput> = async ({page, limit, sort = 'desc', searchTerm = '' }: SearchTagsInput, context): Promise<SearchTagsOutput> => {
  if (!context.user) {
    throw new HttpError(401); // Unauthorized
  }

  const tags = await context.entities.Tag.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { name: sort as 'asc' | 'desc' },
    where: {
      name: { contains: searchTerm, mode: 'insensitive' },
      resources: {
        some: {
          resource: {
            userId: context.user.id,
          },
        },
      },
    },
  });

  return { tags };
}

type GenerateSasTokenInput = {
  timezone: string;
  locale: string;
};

type GenerateSasTokenOutput = {
  sasToken: string;
};

export const generateSasToken: GenerateSasToken<GenerateSasTokenInput, GenerateSasTokenOutput> = async (): Promise<GenerateSasTokenOutput> => {

  const containerName = process.env.AZURE_STORAGE_ACCOUNT_CONTAINER_NAME!;
  const storageAccountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
  const storageAccountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;

  const sharedKeyCredential = new StorageSharedKeyCredential(storageAccountName, storageAccountKey);

  const sasToken = generateBlobSASQueryParameters({
    containerName,
    permissions: BlobSASPermissions.parse("rw"), // Adjust permissions as needed
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + 60 * 60 * 48),
  }, sharedKeyCredential).toString();

  return { sasToken };
};
