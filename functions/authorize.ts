import * as qs from 'querystring';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const authorize = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const params = event.queryStringParameters || {};

  const query = {
    client_id: params['client_id'],
    scope: params['scope']
      .split(' ')
      .filter((s) => s != 'openid')
      .join(' '),
    state: params['state'],
    response_type: params['response_type'],
  };

  console.log('query', query);

  return {
    statusCode: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${qs.stringify(
        query
      )}`,
    },
    body: '',
  };
};

export { authorize };
