# frontend/Dockerfile
# Use the official node image as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the application into the container
COPY . /app

# Build the app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]
