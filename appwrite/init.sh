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

# Deploy collections
appwrite deploy collection --all --yes

# Deploy teams
appwrite deploy team --all --yes

# Deploy buckets
appwrite deploy bucket --all --yes

# Deploy functions. Skip if endpoint value is missing. 
# Also, creates api key for functions
# Uses endpoint and created api key to replace APPWRITE_FUNCTION_ENDPOINT and APPWRITE_API_KEY values in appwrite.json functions for successful deploy.

# Endpoint base path. Useful when deploying functions. For localhost, it has to be the IP of local machine
# Change this variable to proper cloud url when deploying to cloud. 
#
# Example variables:
# endpoint=http://172.30.113.211/v1
# endpoint=https://cloud.appwrite.io/v1
#
# Please remove the changed value after using script - don't commit it :)
endpoint=""

if [ -z "$endpoint"]
then
    echo endpoint variable required for deploying functions is missing. Skipping functions deploy.
else 
    api_key=$(appwrite projects createKey --json --projectId $projectId --name FUNCTIONS_API_KEY --scopes databases.read collections.read documents.read documents.write | jq -r '.secret') 
    sed -i "s,{{APPWRITE_FUNCTION_ENDPOINT}},$endpoint,g" appwrite.json
    sed -i "s/{{APPWRITE_API_KEY}}/$api_key/g" appwrite.json
    appwrite deploy function --all --yes
fi
