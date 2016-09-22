# ask-me-test

This application is used as part of the *Lean Engineering* demo.
**This is just a frontend part** of the app and in order to run it successfully
you will need to get the backend part as well.

To get the frontend path up and running you will need:

 - nodejs (version 4.2 is recommended, should be running on older ones without a problem)
 - npm (2.14 was used the last time feature were added)

The workflow / compilation is standard AOWP stuff:

  - npm install
  - bower install
  - grunt build/serve

Note: The app uses *http* and *websockets* to communicate to backend.

To run the BDD/acceptance tests you will need:

  - phantomjs with webdriver running on port 4444 (`phantomjs --webdriver=4444`)
  - an instance of the frontend part running in the background locally (`grunt serve`)
  - an instance of the backend part (with db of course) running locally
  (`node index.js` in the backend part folder)
  - `grunt acceptance` should connect to the app via the phantomjs and the bdd tests

To run unit tests:

  - `grunt test`

To run static code analysis:

  - `grunt jshint`
