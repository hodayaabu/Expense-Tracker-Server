
import { dbService } from "../../services/db.service.js";
import { ObjectId } from "mongodb";

const collectionName = "users";

export const userService = {
  getById,
  add,
  getByUsername
};


async function getById(userId) {
  try {
    const collection = await dbService.getCollection(collectionName);

    const user = collection.findOne({ _id: new ObjectId(userId) });
    if (!user) throw `Couldnt find a user with id: ${userId}`;

    return user;
  } catch (err) {
    throw err;
  }
}

async function add(userToAdd) {
  try {
    const collection = await dbService.getCollection(collectionName);

    await collection.insertOne(userToAdd);
    return userToAdd;
  } catch (err) {
    throw err;
  }
}

async function getByUsername(username) {
  const collection = await dbService.getCollection(collectionName);
  const user = collection.findOne({ username });
  return user;
}

