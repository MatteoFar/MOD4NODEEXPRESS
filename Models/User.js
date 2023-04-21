import mongoose from "mongoose";

const collectionName = "user";
export const UserModel = mongoose.model(
  "user", // Nom du modèle (libre au choix)
  {
    _id: mongoose.Schema.Types.ObjectId,
    lastname: String,
    firstname: String,
    email: String,
    password: String,
  }, // Schéma des documents de la collection
  collectionName // Optionnel: Nom de la collection dans la base Mongo
);
