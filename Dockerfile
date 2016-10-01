FROM readytalk/nodejs
WORKDIR /app/server
ADD server/package.json /app/server/
RUN npm install
ADD . /app

CMD []
ENTRYPOINT ["/nodejs/bin/npm", "start"]
