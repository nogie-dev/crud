FROM node:16.13

LABEL maintainer "nogie<layer7@kakao.com>"
LABEL "purpose"="devEnviroment"

RUN apt-get update
RUN apt-get install vim -y
RUN apt-get install net-tools
RUN mkdir /working

WORKDIR /working

#COPY ./ /working/
#CMD npm install

EXPOSE 3000