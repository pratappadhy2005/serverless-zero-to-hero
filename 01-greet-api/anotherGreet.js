exports.anotherGreet = async (event) => {
    try {
        // Parse the event body
        const requestBody = JSON.parse(event.body);

        if (!requestBody.name) {
            return {
                statusCode: 400,
                body: JSON.stringify(
                    {
                        message: "Name is required",
                    },
                    null,
                    2
                ),
            };
        }
        // Extract the name from the request body
        const name = requestBody.name || "Stranger";
        // Return a greeting message with the name
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: `Good day ${name} and have a great day!`,
                    input: event,
                },
                null,
                2
            ),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(
                {
                    message: "Internal server error",
                    error: error.message,
                },
                null,
                2
            ),
        };
    }
};