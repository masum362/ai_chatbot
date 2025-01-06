import * as aiServices from "../services/ai.services.js";
export const generateResponse = async (req, res) => {
  console.log("called");
  try {
    const prompt = req.query.prompt;
    const result = await aiServices.generateResponse(prompt);
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
