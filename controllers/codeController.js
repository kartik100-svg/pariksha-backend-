import axios from "axios";

export const runCode = async (req, res) => {
  try {
    const { language, code, input } = req.body;

    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language,
        version: "*",
        files: [
          {
            name: "main",
            content: code,
          },
        ],
        stdin: input || "",
      }
    );

    res.status(200).json({
      output: response.data.run.output,
    });

  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: error.response?.data || error.message,
    });
  }
};