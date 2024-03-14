// search.js
import Lawyer from '../models/lawyer.js';

export const searchLawyers = async (req, res) => {
  try {
    const { query } = req.body;
    const lawyers = await Lawyer.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        // Add more fields for searching if needed
      ],
    });

    res.status(200).json(lawyers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
