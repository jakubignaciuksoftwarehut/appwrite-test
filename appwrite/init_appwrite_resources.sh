# This script assumes you already have appwrite.json file in current directory and your goal is to create resources
# defined there in appwrite instance which you will log into.
# It endpoint for client was already selected, it will be used. If you want to change it (for example for initiating new,
# different then used before instance - might be useful for new environment) run the following command
# 'appwrite client --endpoint NEW_ENDPOINT'
#

# Start by logging in
appwrite login

echo 'IMPORTANT!!! \n\n Read this carefully before you continue, and read everything!'
echo 'Yes, to proceed you have to agree to override the project and then choose option to create a new Apprwrite project.'
echo '\n'
echo 'Please use the values from appwrite.json - copy and paste them manualy - for project ID and project name when asked below.'
echo 'This will prevent from overriding the values there.'
echo 'It will probably still work if you override them, but will most likely result in everyone commiting they own values the whole time.'
echo 'Also, be aware that removing the project and trying to create it with the same id might cause the server error.\n'
echo 'If that happens for you, try creating with new id and just avoid commiting appwrite.json unless necessary\n'

# Allow to override and dont worry.
appwrite init project

# --- Deploy resources defined in appwrite.json ---

# Deploy collections
appwrite deploy collection --all --yes

# Deploy teams
appwrite deploy team --all --yes

# Deploy buckets
appwrite deploy bucket --all --yes

# Deploy functions as they are defined in appwrite.json. It usually means the
# APPWRITE_FUNCTION_ENDPOINT and APPWRITE_FUNCTION_API_KEY values has to be updated.
# For local deployment, set APPWRITE_FUNCTION_ENDPOINT to have your host machine ip, for example =http://172.30.113.211/v1
# For initiating data in cloud (for example creating new environment, similiar to one which already exists)
# the value could be https://cloud.appwrite.io/v1
#
# To have proper APPWRITE_FUNCTION_API_KEY value, generate api key for the function first, with proper scopes. The information about proper, minimal scopes is something
# which should be idealy delivered by function author and for example written somewhere in function description
# (e.g README file in function code). You can generate the proper key with CLI command
# 
# appwrite projects createKey --json --projectId YOUR_PROJECT_ID --name YOUR_FUNCTION_NAME --scopes scope1 scope2 scope3
# 
# Example (with assigning created key to local variable which can be echoed later)
# api_key=$(appwrite projects createKey --json --projectId $projectId --name FUNCTION1_API_KEY --scopes databases.read collections.read documents.read documents.write | jq -r '.secret') 
#
# Alternatively, you can use create_api_key.sh script for that. Make sure to set proper values there.

appwrite deploy function --all --yes

