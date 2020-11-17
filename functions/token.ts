import * as qs from 'querystring';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const token = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = qs.parse(event.body!);

  return {
    statusCode: 200,
    body: JSON.stringify({
      access_token: '',
      id_token: '',
    }),
  };
};

export { token };
