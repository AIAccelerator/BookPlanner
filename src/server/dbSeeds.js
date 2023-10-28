export const devSeedSimple = async (prismaClient) => {
  const user = await createUser(prismaClient, {
    email: "manol.trendafilov@gmail.com",
    password: "12345678",
  });
};

async function createUser(prismaClient, data) {
  const { password, ...newUser } = await prismaClient.user.create({ data });
  return newUser;
}

async function createBooks(prismaClient, data) {
  const { password, ...newUser } = await prismaClient.user.create({ data });
  return newUser;
}