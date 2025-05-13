import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event) => {
  const data = JSON.parse(event.body || '{}');
  const { email, productId } = data;

  if (!email || !productId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing email or productId' }),
    };
  }

  await dynamoDb.put({
    TableName: process.env.SUBSCRIPTIONS_TABLE!,
    Item: {
      email,
      productId,
      subscribedAt: new Date().toISOString(),
    },
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Subscription successful' }),
  };
};