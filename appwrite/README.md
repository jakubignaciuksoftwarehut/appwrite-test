# Use appwrite as Baas (Backend as a service)

Installation: For using locally with docker please follow this article: https://appwrite.io/docs/self-hosting
If the one-line installation command fails one of the solution might be to check the error and download docker images manually, for example by running
`docker pull mariadb`
or any other image which had an error.

The last step is to register user on the installed instance - this will allow to manage the appwrite instance. Simply go in your browser
to the host selected during setup (http://localhost by default) and register the user there.

## Local deployment - certificates

Warning! Appwrite uses basic traefic certificate for local deployment, which is good enough, but the initial calls can fail
To make them work, it might be necessary to visit one of the endpoint via browser and allow to go in advanced security options to go there after seeing an information about certificate issue. For example, you can use healthchech endpoint - assuming default settings, here's the url:
https://localhost/v1/healthcheck

## The appwrite.json file

The appwrite.json file stores locally some data about current project - functions, databases, collections, buckets and teams. The resources can be deployed from it to appwrite instance or their data can be (except functions) from the appwrite instance, to make sure they are not outdated. In general it's good idea but looks like it's still lacking some finishing touches. Looks like its designed mostly for working with cloud and working with functions can make it harder to maintain. But in general, it's good idea to start with having file commited to repository - unless it's clean it's wrong. Read further for more informations.

## Deployment with local(for example docker) appwrite instance 

There is few options to start working with appwrite, depending on what we need to do. There are some scripts provided, which are using appwrite-cli and jq (json parser). Start with installing them by running

`npm install -g appwrite-cli`

For more details please check https://appwrite.io/docs/command-line

Install jq if not present in the system.to parse the json. Run the installation command:

`sudo apt-get install jq`

### Develop with local appwrite instance, option 1: Init project structure from appwrite.json (prefered option when working with local )

There is bash script for initating data(which can be used for replicating resources on different environments) prepared - init_appwrite_resources.sh . You can execute it by running:

`sh init_appwrite_resources.sh`

This will ask you to log in to appwrite instance. Make sure to read the description in the script file and information on the screen before you run it!

Important: For deploying he functions, the endpoint and api key has to be provided. Again, read the comments in the script.

### Develop with local appwrite instance, option 2: Don't commit appwrite.json, use other 'base' file to create appwrite.json for each developer.

As described earlier, some issues may arise with appwrite.json which will make it impossible for everyone to use the same file.
That might lead to people endlessly commiting own version of appwrite.json when developing things, which might be quite annoying.
As an example, the appwrite.json stores projectId and projectName of the project. It is possible to set them to same values for each developer, but there might be situations which can change that. For example, it looks like deleting the project and trying to create it again with same projectID and projectName will result in server error. Other example is when we have to develop functions with local appwrite instance - when deploying, the function requires to have APPWRITE_FUNCTION_ENDPOINT and APPWRITE_FUNCTION_API_KEY which will be different for different users.
When situations like that happens, it's usually better to add appwrite.json to .gitignore and add another file to make it a base file for creating appwrite.json locally.
This file can be copied as appwrite.json, and the problematic fields can be set correctly for each user. In this repo, there is an example file used for doing that called appwrite-base.json. This file has some example resources and some 'template' fields, which should be set to correct values by each user.

This repository also has init_with_functions.sh script which can be used to create appwrite.json file with proper values and also create
API_KEYS (with some example scopes) for deploying functions. Check the script itself for more informations.

In general probably having another file seems like safer option, but we have to remember to have it synchronised both ways - when there is something new in the other file, we have to add the changes to our local appwrite.json, and when we create a new resource it's good to add it also to the base file and commit, so others can deploy the change locally by running proper deploy command, as described in https://appwrite.io/docs/command-line-ci
 
### Develop with cloud instance:

Developing with cloud instance is quite simple, as usually just one person has to create initial resources (and perhaps appwrite.json file, but it's not necessary), and everyone can use it, as long as they log in. There is also a script for fetching data and creating appwrite.json provided in this repository - start_with_remote.sh. Also, there is a simplified version of that script provided - fetch_from_remote.sh which is just trying to fetch the resources with the assumption that user is already logged in and project is initiated locally(appwrite.json exists) - this 

### More about developing functions

This repository provides simple example of how to store functions code. It has a functions directory which is referenced from appwrite.json file, and used when deploying functions. It's also good to remember, that functions require api keys to work properly. The keys have to be supplied in variables to make them work (see appwrite.json for example). There is no need to have different API_KEY for each function, as what really matters there is if the scopes are correct for the key - to grant function proper permissions to execute the code properly.
When working with local instance, each developer can create proper key before deploying function and use it there; in general, everyone can handle it individualy. Also, regardless of who created the function, everyone has to create proper key to deploy and run the function properly. It's good idea to leave the information about API KEY scopes required to run the function in function README file. See functions/ListSkills/README.md for example.
When working with cloud, the situation changes a bit - each user can use the same API KEY for the same function.
But as the function is already deployed, it matters only for someone who wants to deploy some change. 
As it is not recommended to have it commited to repository, but the key secret can be actually seen in the appwrite console (by checking variables in settings of the function). Use that to get the key and set it as a value of APPWRITE_FUNCTION_API_KEY for proper function in your appwrite.json file - and you are ready to do the changes and redeploy the function by running
`appwrite deploy function`.