FROM node:16-alpine3.12
RUN apk add --no-cache python3 py3-pip \
    && pip3 install --upgrade pip \
    && pip3 install awscli \
    && rm -rf /var/cache/apk/*
COPY . /wiki
WORKDIR /wiki
RUN yarn cache clean && yarn install
RUN CI=false yarn build