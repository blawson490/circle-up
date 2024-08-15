// import { PrismaClient } from '@prisma/client'
// import CategoryEditorForm from './categoryEditorForm'

// const prisma = new PrismaClient()

// export default async function CategoryEditorPage({ params }: { params: { categoryId: string } }) {
//   const categoryId = params.categoryId === 'new' ? null : parseInt(params.categoryId, 10)
  
//   let category = null
//   if (categoryId) {
//     category = await prisma.category.findUnique({
//       where: { id: categoryId },
//       include: {
//         collections: {
//           include: {
//             decks: {
//               include: {
//                 cards: true
//               }
//             }
//           }
//         }
//       }
//     })
//   }

//   return <CategoryEditorForm initialCategory={category} />
// }