const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create Categories
  const smallGroups = await prisma.category.create({
    data: { name: 'Small Groups' },
  });

  const family = await prisma.category.create({
    data: { name: 'Family' },
  });

  // Create Collections for Small Groups
  const iceBreakers = await prisma.collection.create({
    data: {
      title: 'Ice Breakers',
      description: 'Questions to get the conversation started',
      color: 'blue',
      icon: 'ice-cream',
      categoryId: smallGroups.id,
    },
  });

  // Create Collections for Family
  const kids = await prisma.collection.create({
    data: {
      title: 'Kids',
      description: 'Questions for family time with children',
      color: 'green',
      icon: 'baby',
      categoryId: family.id,
    },
  });

  const spouses = await prisma.collection.create({
    data: {
      title: 'Spouses',
      description: 'Questions to strengthen your marriage',
      color: 'red',
      icon: 'heart',
      categoryId: family.id,
    },
  });

  // Create Decks and Cards for Ice Breakers
  const iceBreakersBasic = await prisma.deck.create({
    data: {
      title: 'Basic Ice Breakers',
      description: 'Simple questions to get to know each other',
      collectionId: iceBreakers.id,
      cards: {
        create: [
          { text: "If you could have dinner with any person in history, who would it be and why?" },
          { text: "What's your favorite Bible verse and why does it speak to you?" },
          { text: "If you could instantly become an expert in one subject, what would it be?" },
        ],
      },
    },
  });

  // Create Decks and Cards for Kids
  const kidsBasic = await prisma.deck.create({
    data: {
      title: 'Fun Family Questions',
      description: 'Engaging questions for family time',
      collectionId: kids.id,
      cards: {
        create: [
          { text: "If you could be any animal from Noah's Ark, which would you be and why?" },
          { text: "What's your favorite story from the Bible and why do you like it?" },
          { text: "If Jesus came to dinner at our house, what would you want to ask Him?" },
        ],
      },
    },
  });

  // Create Decks and Cards for Spouses
  const spousesBasic = await prisma.deck.create({
    data: {
      title: "Couple's Connection",
      description: 'Questions to deepen your relationship',
      collectionId: spouses.id,
      cards: {
        create: [
          { text: "What's one way you've seen God work in our marriage recently?" },
          { text: "How can I pray for you this week?" },
          { text: "What's one dream you have for our family's future?" },
        ],
      },
    },
  });

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });