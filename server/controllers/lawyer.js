import Lawyer from "../models/lawyer.js";

/* READ */
export const getLawyer = async (req, res) => {
  
    try {
      const lawyers = await Lawyer.find();
      res.json(lawyers);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
      res.status(500).json({ error: 'Internal server error' });
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
