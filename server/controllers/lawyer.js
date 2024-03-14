import Lawyer from "../models/lawyer.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const Lawyer = await Lawyer.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const Lawyer = await Lawyer.findById(id);

    const friends = await Promise.all(
      Lawyer.friends.map((id) => Lawyer.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const Lawyer = await Lawyer.findById(id);
    const friend = await Lawyer.findById(friendId);

    if (Lawyer.friends.includes(friendId)) {
      Lawyer.friends = Lawyer.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      Lawyer.friends.push(friendId);
      friend.friends.push(id);
    }
    await Lawyer.save();
    await friend.save();

    const friends = await Promise.all(
      Lawyer.friends.map((id) => Lawyer.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
