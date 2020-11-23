import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { graphql } from '@octokit/graphql';

const userinfo = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { viewer } = await graphql({
    query: `{
        viewer {
            login
            name
            email
        }
    }`,
    headers: {
      ...{
        Authorization: event.headers['Authorization'],
      },
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(viewer),
  };
};

export { userinfo };
