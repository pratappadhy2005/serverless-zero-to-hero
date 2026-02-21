module.exports.greet = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Good day Pratap!",
        input: event,
      },
      null,
      2
    ),
  };
};
