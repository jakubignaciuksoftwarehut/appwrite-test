# Use appwrite as Baas (Backend as a service)

Installation: For using locally with docker please follow this article: https://appwrite.io/docs/self-hosting
If the one-line installation command fails one of the solution might be to check the error and download docker images manually, for example by running
`docker pull mariadb`
or any other image which had an error.

The last step is to register user on the installed instance - this will allow to manage the appwrite instance. Simply go in your browser
to the host selected during setup (http://localhost by default) and register the user there.

## Local deployment

Appwrite uses basic traefic certificate for local deployment, which is good enough, but the initial calls can fail
To make them work, it might be necessary to visit one of the endpoint via browser and allow to go in advanced security options to go there after seeing an information about certificate issue. For example, you can use healthchech endpoint - assuming default settings, here's the url:

https://localhost/v1/healthcheck

## Init project structure from appwrite.json (instuctions for linux)

There is bash script for initating data(which can be used for replicating resources on different environments) prepared - init.sh

To run it, install the appwrite-cli first, by running:

`npm install -g appwrite-cli`

For more details please check https://appwrite.io/docs/command-line

The script also uses the jq to parse the json. If you dont have it already installed, run the installation command:

`sudo apt-get install jq`

Then you can run the script:

`sh init.sh`

This will log in user via console, create a new project and use data from appwrite-base.json file to create appwrite.json file and set some values there. The script uses appwrite deploy command to create proper resources (databases, collections, buckets, teams and functions).

Important: For deploying he functions, the endpoint and api key has to be provided. The script creates the key, but needs to work properly it's also required to set the endpoint value in init.sh. It requires the ip of local machine to work properly locally - this can be usually found by running

`hostname -I`

but depending on the system it might not always work. Please check the comment in the script, and also visit https://appwrite.io/docs/functions for more informations.

## Alternative method

The project can be initiated manually in console and the appwrite.json file could be used to run deploy functions (after making sure the projectId is set correctly there)

The commands to run are:

`appwrite deploy collection --all --yes`
`appwrite deploy team --all --yes`
`appwrite deploy bucket --all --yes`
`appwrite deploy function --all --yes`

But again - it's better to check if the data in functions variables is correct when running it locally as the endpoint will be different on each machine.