#!/bin/bash

cd keys
KEY_ID=cognito-github-oidc

if [ ! -f "$(pwd)/$KEY_ID.key" ]; then
ssh-keygen -t rsa -b 4096 -m PEM -f $KEY_ID.key
openssl rsa -in $KEY_ID.key -pubout -outform PEM -out $KEY_ID.key.pub
fi

cd ../
