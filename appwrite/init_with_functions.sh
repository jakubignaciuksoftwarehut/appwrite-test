# USE CAREFULLY AND READ THE DESCRIPTION FIRST!
#
# This script assumes the appwrite.json file does not exist or it's not important if it gets changed.
# If that's not the case, dont run the script.
#
# The goal of this script is to create proper appwrite.json file from appwrite-base.json(by default) file which 
# will have some placeholder values. The main usage for that is to automatically create the api_key for each function with
# some predefined scopes (scroll down to near the end of script to check createKey command) and use it for function deploy.

# Endpoint base path. Useful when deploying functions. For localhost, it has to be the IP of local machine
# Change this variable to proper cloud url when deploying to cloud. 
#
# Example variables:
# endpoint=http://172.30.113.211/v1
# endpoint=https://cloud.appwrite.io/v1 #not tested, but most likely correct
#
# Please remove the changed value after using script - don't commit it :)
endpoint=http://172.31.32.20/v1

if [ -z "$endpoint" ]
then
    echo 'endpoint variable is not set. Check the script and set proper variable.'
    exit 0
fi

echo 'DONT RUN THIS SCRIPT/TEMINATE IT IF YOU DONT HAVE FUNCTIONS DEFINED AND FILE WITH CONFIGURATION WITH PLACEHOLDER VALUES(by default appwrite-base.json) READY AS IT WILL ONLY OVERRIDE YOUR appwrite.json FILE.'

# Reset CLI, so you can select endpoint when logging in
appwrite client --reset

# Start by logging in
appwrite login

# Init new project
appwrite init project

# Get projectId from appwrite.json with jq. Alternatively, you can just assign the value here manually
projectId=$(jq -r '.projectId' appwrite.json)

# Get projectName from appwrite.json with jq. Alternatively, you can just assign the value here manually
projectName=$(jq -r '.projectName' appwrite.json)

# Copy appwrite-base.json (with template fields which will be changed in the script) to create appwrite.json. 
# This overrides the fresh appwrite.json - adds structure from appwrite-base
cp appwrite-base.json appwrite.json

# Replace overrided projectId and projectName with proper values
sed -i "s/{{PROJECT_ID}}/$projectId/" appwrite.json
sed -i "s/{{PROJECT_NAME}}/$projectName/" appwrite.json

# --- Deploy resources defined in appwrite.json ---

# Deploy functions. Skip if endpoint value is missing. 
# Also, creates api key for functions
# Uses endpoint and created api key to replace APPWRITE_FUNCTION_ENDPOINT and APPWRITE_FUNCTION_API_KEY values in appwrite.json functions for successful deploy.
api_key=$(appwrite projects createKey --json --projectId $projectId --name FUNCTIONS_API_KEY --scopes databases.read collections.read documents.read documents.write | jq -r '.secret') 
sed -i "s,{{APPWRITE_FUNCTION_ENDPOINT}},$endpoint,g" appwrite.json
sed -i "s/{{APPWRITE_FUNCTION_API_KEY}}/$api_key/g" appwrite.json
appwrite deploy function --all --yes

# Deploy collections
appwrite deploy collection --all --yes

# Deploy teams
appwrite deploy team --all --yes

# Deploy buckets
appwrite deploy bucket --all --yes
