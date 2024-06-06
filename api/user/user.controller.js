import { userService } from "./user.service.js";


export async function getUser(req, res) {
  const userId = req.params._id;
  try {
    const user = await userService.getById(userId);
    res.send(user);
  } catch (err) {
    res.status(400).send({ err: "Failed to get user" });
  }
}

export async function addUser(req, res) {
  const { username, password, email, imgUrl } = req.body;
  const userToSave = {
    username,
    password,
    email,
    imgUrl,
  };
  try {
    const savedUser = await userService.add(userToSave);
    res.send(savedUser);
  } catch (err) {
    res.status(400).send({ err: "Could't add user" });
  }
}
