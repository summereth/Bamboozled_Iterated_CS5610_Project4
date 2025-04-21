import { MongoClient, ObjectId } from "mongodb";

const collectionName = "question";

function getClientAndCollection() {
  const mongo_uri = process.env.MONGO_URI || "mongodb://localhost:27017";

  const client = new MongoClient(mongo_uri);
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection(collectionName);

  return { client, collection };
}

async function fetchQuestionsById(quizId) {
  const { client, collection } = getClientAndCollection();

  try {
    await client.connect();

    const result = await collection.findOne({ quizId: new ObjectId(quizId) });
    return result;
  } catch (error) {
    console.error("[DB] Error getting questions by quizId: ", error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

async function insertQuestions(questions, quizId) {
  const { client, collection } = getClientAndCollection();
  const newQuestions = {
    questions: questions.map((question) => ({
      ...question,
      _id: new ObjectId(),
      points: Number(question.points),
      correctOption: Number(question.correctOption),
    })),
    quizId: new ObjectId(quizId),
  };

  try {
    await client.connect();

    const result = await collection.insertOne(newQuestions);
    return result;
  } catch (error) {
    console.error("[DB] Error inserting questions: ", error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

async function deleteQuestionsById(quizId) {
  const { client, collection } = getClientAndCollection();

  try {
    await client.connect();

    const result = await collection.deleteOne({ quizId: new ObjectId(quizId) });
    return result;
  } catch (error) {
    console.error("[DB] Error deleting questions by quizId: ", error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export { fetchQuestionsById, insertQuestions, deleteQuestionsById };
