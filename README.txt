To give a user acess to admin features, you must manually assign them privilege in the mongo database:
db.users.updateOne(<filter>, {$set: {"admin": true}})
