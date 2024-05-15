# Use official Node.js image as a base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Mocha for testing
RUN npm install --save-dev mocha

# Copy test files
COPY test /usr/src/app/test

# Command to run the tests
CMD ["npx", "mocha", "test/test.js"]
