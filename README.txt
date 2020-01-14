This is a simple message board created for my Web Services final project at Camosun College.

To run locally, use:
npm run-script dev
  - http://localhost:3000/api/v1 is set as the API URL in the .env file when running this script

MongoDB dump file for db setup can be found under:
/api_server/mongo_seed/

To give a user acess to admin features, you must manually assign them privilege in the mongo database:
db.users.updateOne(<filter>, {$set: {"admin": true}})
