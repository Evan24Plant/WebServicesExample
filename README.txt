To run locally, use:
npm run-script dev
  - http://localhost:3000/api/v1 is set as the API URL in the .env file when running this script

To give a user acess to admin features, you must manually assign them privilege in the mongo database:
db.users.updateOne(<filter>, {$set: {"admin": true}})
