import { PrismaClient, Document } from "@shared/prisma-client/src/generated";

const prisma = new PrismaClient();

export async function saveOrUpdateDocumentLocally(
  document: Document
): Promise<Document> {
  return prisma.document.upsert({
    where: { id: document.id },
    update: document,
    create: document,
  });
}

export async function batchSaveOrUpdateDocuments(
  documents: Document[]
): Promise<{ created: number; updated: number }> {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const existingIds = (
        await prisma.document.findMany({
          where: { id: { in: documents.map((doc) => doc.id) } },
          select: { id: true },
        })
      ).map((doc) => doc.id);

      const documentsToCreate = documents.filter(
        (doc) => !existingIds.includes(doc.id)
      );
      const documentsToUpdate = documents.filter((doc) =>
        existingIds.includes(doc.id)
      );

      const created = await prisma.document.createMany({
        data: documentsToCreate,
        skipDuplicates: true,
      });

      let updated = 0;
      const batchSize = 100;
      for (let i = 0; i < documentsToUpdate.length; i += batchSize) {
        const batch = documentsToUpdate.slice(i, i + batchSize);
        const values = batch
          .map(
            (doc) =>
              `(${doc.id}, '${doc.content.replace(/'/g, "''")}', '${doc.owner}')`
          )
          .join(", ");

        const query = `
            UPDATE "Document"
            SET content = data.content, owner = data.owner
            FROM (VALUES ${values}) AS data(id, content, owner)
            WHERE "Document".id = data.id
          `;

        const updatedBatch = await prisma.$executeRawUnsafe(query);
        updated += updatedBatch;
      }

      return { created: created.count, updated };
    });

    return result;
  } catch (error) {
    console.error("Errore durante il batch insert/update:", error);
    throw error;
  }
}

export async function getLocalDocuments(): Promise<Document[]> {
  return prisma.document.findMany();
}
