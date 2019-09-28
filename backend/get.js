import AWS from "aws-sdk";
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const get = (event, context, callback) => {
  console.log("++++++++++++++++");
  console.log(event.pathParameters.id);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      "year": "2002",
      "drwNo": event.pathParameters.id
    }
  };

  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    console.log(params);
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(params),
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};