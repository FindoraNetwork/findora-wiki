FROM node:16-alpine3.12
COPY . /wiki
WORKDIR /wiki
RUN apk add git openssh-client
RUN git config --global user.name "Findora CI" ; git config --global user.email ci@findora.org
RUN yarn cache clean
RUN yarn install
