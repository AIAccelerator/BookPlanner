// Import the faker library
import { faker } from '@faker-js/faker';// Import the faker library
import config from 'dotenv/config';
config.path = '../../.env.server';

export const devSeedSimple = async (prismaClient) => {
  const user = await createUser(prismaClient, {
    email: process.env.SEED_USER_EMAIL,
    password: process.env.SEED_USER_PASS,
    fullName: 'John Doe',
    isEmailVerified: true
  });
};

async function createUser(prismaClient, data) {
  const { password, ...newUser } = await prismaClient.user.create({ data });
  return newUser;
}

export const devSeedBooks = async (prismaClient) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email: process.env.SEED_USER_EMAIL,
    }
  });

  if (!user) {
    console.error('User not found');
    return;
  }

  // Create 50 books
  for (let i = 0; i < 50; i++) {
    await createBooks(prismaClient, {
      title: faker.lorem.sentence(),  // Generate a random title
      author: faker.person.fullName(),  // Generate a random author name
      userId: user.id,  // Associate the book with the created user
    });
  }
};


// The seeder function to create resources with random tags
export const devSeedResources = async (prismaClient) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email: process.env.SEED_USER_EMAIL,
    },
  });

  if (!user) {
    console.error('User not found');
    return;
  }

  const firstTags = [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()];
  const secondTags = [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()];
  // Create 50 resources
  for (let i = 0; i < 50; i++) {
    const resourceData = {
      title: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      resourceType: faker.helpers.arrayElement(['url', 'pdf', 'doc', 'text', 'google_search']),
      url: faker.internet.url(),
      tags: [
        { name: faker.helpers.arrayElement(firstTags)  },
        { name: faker.helpers.arrayElement(secondTags)  },
      ],
      userId: user.id,
    };

    await createResource(prismaClient, resourceData, user.id);
  }
};

async function createBooks(prismaClient, data) {
  const { title, author, userId } = data;  // Destructure the data argument to get the title, author, and userId values

  const newBook = await prismaClient.book.create({
    data: {
      title,  // Set the title field with the title value
      author,  // Set the author field with the author value
      user: {
        connect: {
          id: userId,  // Connect the book with the user
        },
      },
    },
  });

  // Create 10 chapters for the book
  for (let i = 0; i < 10; i++) {
    await prismaClient.chapter.create({
      data: {
        title: faker.lorem.sentence(),
        number: i + 1,
        description: faker.lorem.paragraph(),
        book: {
          connect: {
            id: newBook.id,
          },
        }
      }
    });
  }

  return newBook;
}

async function createResource(prismaClient, data) {
  const { title, description, resourceType, url, tags, userId } = data;

  const newResource = await prismaClient.resource.create({
    data: {
      title,
      description,
      resourceType,
      url,
      user: {
        connect: {
          id: userId,
        },
      },
      tags: {
        create: tags.map(tag => ({
          tag: {
            connectOrCreate: {
              where: { name: tag.name },
              create: { name: tag.name },
            }
          }
        }))
      }
    }
  });

  return newResource;
}
