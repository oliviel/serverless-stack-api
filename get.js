import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  console.log('THIS IS THE ENVAIROMENT', process.env.tableName);

  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'user_id': Identity Pool identity id of the authenticated user
    // - 'note_id': path parameter

    Key: {
      user_id: event.requestContext.identity.cognitoIdentityId,
      note_id: event.pathParameters.id
    }
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

   // Return the retrieved item
   return result.Item;
});