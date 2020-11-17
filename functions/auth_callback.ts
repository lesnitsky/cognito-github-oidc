import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const auth_callback = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(event.queryStringParameters),
  };
};

export { auth_callback };
