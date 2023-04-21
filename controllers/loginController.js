import { UserModel } from "../Models/User.js";
import { validatorLogin } from "../utils/validators.js";
import crypto from "node:crypto";
import { decipherPassword } from "../utils/crypto.js";
import url from "node:url";

export default async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    // vérifier si l'utilisateur existe

    const user = await UserModel.findOne({ email });

    if (user !== null) {
      const passwordDecipher = decipherPassword(user.password);
      validatorLogin(email, password, passwordDecipher);
      // création de la session et redirection vers le dashboard
      req.session.auth = true;
      // redirection vers la page

      res.redirect(
        url.format({
          pathname: "/dashboard",
          query: user.firstname,
        })
      );
    } else {
      res.send({ message: "l'utilisateur n'existe pas !" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
}
