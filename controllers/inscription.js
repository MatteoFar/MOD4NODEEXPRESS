import { validatorInscription } from "../utils/validators.js";
import mongoose from "mongoose";
import { UserModel } from "../Models/User.js";
import { cipherPassword } from "../utils/crypto.js";

export default async function inscriptionController(req, res) {
  const { firstname, lastname, email, password, password_confirm } = req.body;

  try {
    validatorInscription(
      firstname,
      lastname,
      email,
      password,
      password_confirm
    );
    console.log("pass !");

    const encryptedPassword = cipherPassword(password);

    // vérfifier si existe !
    const hasAlreadyUser = await UserModel.findOne({ email });

    if (hasAlreadyUser === null) {
      // envoi vers la base de donnée
      const sendUser = await UserModel.create({
        _id: new mongoose.Types.ObjectId(),
        lastname,
        firstname,
        email,
        password: encryptedPassword,
      });
      console.log("essaie envoi", sendUser);
      res.redirect("/loginPage");
    } else {
      res.send({ message: "Utilisateur existe déjà !" });
      // res.render("home", { message:"Utilisateur existe déjà !" }); // envoie de l'erreur : TODO : faire en sorte que le message d'erreur soit envoyé
    }
  } catch (error) {
    console.log(error);
    // res.render("home", { error }); // envoie de l'erreur : TODO : faire en sorte que le message d'erreur soit envoyé
  }
}
