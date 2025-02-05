# Use an official Node.js runtime as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g nodemon  # Install Nodemon globally

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the application with nodemon for auto-reloading
CMD ["npm", "run", "dev"]
