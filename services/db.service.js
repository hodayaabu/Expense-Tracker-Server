import mongoDB from "mongodb";
const { MongoClient } = mongoDB;

import { config } from "../config/index.js";

export const dbService = {
    getCollection,
};

var dbConn = null;

async function getCollection(collectionName) {
    try {
        const db = await connect();
        const collection = await db.collection(collectionName);
        return collection;
    } catch (err) {
        throw err;
    }
}

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(config.dbURL);
        const db = client.db(config.dbName);
        dbConn = db;
        return dbConn;
    } catch (err) {
        throw err;
    }
}
