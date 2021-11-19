# authServices Mciroservices

This is a simple stateless microservice in Nodejs, with three major functionalities -

Authentication.

JSON patching.

Image Thumbnail Generation.


Public Endpoints
Login
Request body contains an arbitrary username/password pair. (accept any username/password) A signed Json Web Token (https://jwt.io/) will be returned which can be used to validate future requests.

Private Endpoints.
Apply Json Patch.
Request body contains a JSON object and a JSON patch object (http://jsonpatch.com/). service applies the json patch to the json object, and returns the resulting json object. The service is first authorized with a JWT.

Create Thumbnail
Request contains a public image URL. Service downloads the image, resize to 50x50 pixels, and store the resulting thumbnail in thumbnails folder. The service is first authorized with a JWT.

# Setting up

 use npm install for installing dependencies

 use npm start for starting server

 use npx nodemon for starting server with nodemon

 use npm run test for running all tests

 use npm run coverage for running all tests and returning coverage as report



# Containerize

 'docker build .' Build an image from dockerfile

'docker image'    get list of images ids and tags name

'docker run [image id || tag]'

'docker pull ujere/hacker:0.1'   pull image from my docker reposotory

# Usage
Login
Request Body -> { "username":"YOUR_USERNAME", "password":"YOUR_PASSWORD" }
Returned -> { "token":"YOUR_TOKEN" }

JSON Patch
Header -> Authorization : "Bearer YOUR_TOKEN"
Request Body -> { "jsonObject": {JSON_OBJECT} , "jsonPatch": [{JSON_PATCH}] }
Returned -> { "Patched":"JSON_OBJECT_WITH_PATCH" }

Thumbnail Creation

Header -> Authorization : "Bearer YOUR_TOKEN"
Request Body -> { "url":"IMAGE_URL" }
Returned -> { "message":"RESPECTIVE_MESSAGE" }
Thumbnail stored in /public/images/thumbnail

Testing

Testing is done with Mocha and Chai.
