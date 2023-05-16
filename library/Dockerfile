FROM node:18-alpine
WORKDIR /app
ADD . /app
RUN npm install
RUN npm install -g nodemon
# Set environment to "development" by default
ENV NODE_ENV=development

# Create app directory
# make port available outside of the image
CMD ["nodemon", "-L"]
EXPOSE 3000