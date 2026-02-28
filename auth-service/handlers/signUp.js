// Import the required AWS Cognito SDK Classes
// CognitoIdentityProviderClient: used to communicate with Cognito Identity Provider
// SignUpCommand: used to sign up a new user
const { CognitoIdentityProviderClient, SignUpCommand } = require("@aws-sdk/client-cognito-identity-provider");

// Communicate with Cognito Identity Provider
const cognitoClient = new CognitoIdentityProviderClient({ region: "ap-southeast-2" });

// Specify  the Cognito Client ID
const clientId = "174ou5lhevo41e4bmaj3jmpqrr";

// define a lambda fucntion to send signup request

exports.signUp = async (event) => {
    // parse the request body to get the user signUp details
    const { fullName, password, email } = JSON.parse(event.body);

    // create a signUp command with the user details
    const signUpCommand = new SignUpCommand({
        ClientId: clientId,
        Username: email,
        Password: password,
        UserAttributes: [
            {
                Name: "email",
                Value: email,
            },
            {
                Name: "name",
                Value: fullName,
            }
        ],
    });

    try {
        // send the signUp command to Cognito Identity Provider
        const response = await cognitoClient.send(signUpCommand);

        // return the response to the client
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: "User signed up successfully",
                    input: response,
                },
                null,
                2
            ),
        };
    } catch (error) {
        // return the error to the client
        return {
            statusCode: 400,
            body: JSON.stringify(
                {
                    message: "User signed up failed",
                    input: error,
                },
                null,
                2
            ),
        };
    }
}