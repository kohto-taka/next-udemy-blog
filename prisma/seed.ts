import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  // クリーンアップ
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 12);

  // ダミー画像
  const dummyImages = [
    'https://picsum.photos/seed/post1/600/400',
    'https://picsum.photos/seed/post2/600/400'
  ];

  const user = await prisma.user.create({
    data:
      {
        name: "John Doe",
        email: "john.doe@example.com",
        password: hashedPassword,
        posts:{
          create:[
          {
            title: "My first post",
            content: "This is the content of my first post",
            topImage: dummyImages[0],
            published: true
          }, {
            title: "My second post",
            content: "This is the content of my second post",
            topImage: dummyImages[1],
            published: true
          }
        ]}
      }
  })

  console.log({user});
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
