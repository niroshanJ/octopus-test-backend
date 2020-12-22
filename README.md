# octopus-test-backend

# Install


Simply clone the repository.

`git clone https://github.com/niroshanJ/octopus-test-backend.git`

Install node modules:

`npm install`

Configure the database and credential in:

`./config/config.json`

Run migrations:

`sequelize db:migrate`


Run seeders(It will take some time to complete all the seeders)

``sequelize db:seed:all``

Run the App:

`npm start`

Please refer the sequelize documentaiton for more info.
https://github.com/sequelize/cli


