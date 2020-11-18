import * as qs from 'querystring';
import * as jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { graphql } from '@octokit/graphql';

const token = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = qs.parse(event.body!);

  console.log(body);
  console.log(event.headers['Host']);

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (res.status != 200) {
    console.log(res.status, data);

    return {
      statusCode: res.status,
      body: data,
    };
  }

  const { viewer } = await graphql({
    query: `{
      viewer {
        id
      }
    }`,
    headers: {
      authorization: `Bearer ${data.access_token}`,
    },
  });

  const idToken = jwt.sign(
    {
      sub: viewer.id,
    },
    process.env['PRIVATE_KEY'] as string,
    {
      issuer: `https://${event.headers['Host']}`,
      expiresIn: '1h',
      algorithm: 'RS256',
      keyid: 'cognito-github-oidc',
      audience: body.client_id,
    }
  );

  const resBody = {
    access_token: data.access_token,
    id_token: idToken,
    scope: `openid ${(data.scope as string).replace(/,/g, ' ')}`,
    token_type: 'Bearer',
  };

  console.log(resBody);

  return {
    statusCode: 200,
    body: JSON.stringify(resBody),
  };
};

export { token };
