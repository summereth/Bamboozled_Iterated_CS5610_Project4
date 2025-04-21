import { MongoClient, ObjectId } from "mongodb";

const collectionName = "quiz";

function getClientAndCollection() {
  const mongo_uri = process.env.MONGO_URI || "mongodb://localhost:27017";

  const client = new MongoClient(mongo_uri);
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection(collectionName);

  return { client, collection };
}

async function fetchAllQuizzes(keyword = "") {
  const { client, collection } = getClientAndCollection();

  try {
    await client.connect();

    const result = await collection
      .find({
        name: {
          $regex: keyword,
          $options: "i",
        },
      })
      .toArray();
    return result;
  } catch (error) {
    console.error("[DB] Error getting all quizzes: ", error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

async function fetchQuizById(id) {
  const { client, collection } = getClientAndCollection();

  try {
    await client.connect();

    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("[DB] Error getting quiz by id: ", error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

async function insertOneQuiz(quiz) {
  const { client, collection } = getClientAndCollection();

  try {
    await client.connect();

    const result = await collection.insertOne(quiz);
    return result;
  } catch (error) {
    console.error("[DB] Error inserting plan: ", error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

async function updateOneQuizById(id, edited) {
  const { client, collection } = getClientAndCollection();

  try {
    await client.connect();

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: edited },
    );
    return result;
  } catch (error) {
    console.error("[DB] Error updating quiz: ", error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

async function deleteOneQuizById(id) {
  const { client, collection } = getClientAndCollection();

  try {
    await client.connect();

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("[DB] Error deleting quiz: ", error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export {
  insertOneQuiz,
  fetchAllQuizzes,
  fetchQuizById,
  updateOneQuizById,
  deleteOneQuizById,
};
