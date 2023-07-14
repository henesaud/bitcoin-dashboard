# pull official base image
FROM node:16.15.0

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . .  

RUN yarn install --frozen-lockfile

# start app
CMD ["yarn", "start"]