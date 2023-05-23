# creates api key and prints the secret value. This value can be set in appwrite.json to set the key used by function
# (APPWRITE_FUNCTION_API_KEY field in one or more of objects in "functions" array).

# Make sure to set proper values. Example values could be like:
#
# projectId=6465d1d094aa54ee6c7e
# api_key_name=FUNCTIONS1_API_KEY
# scopes='collections.read documents.read documents.write'
#
# Depending on the situation, you can get your project id from appwrite.json file, appwrite-base.json file or by running
# 'appwrite client --debug' command and checking projectId field.
#

projectId=''
api_key_name=''
scopes=''

if [ -z "$projectId" ]
then
    echo 'projectId variable is not set. Check the script and set proper variable.'
    exit 0
fi

if [ -z "$api_key_name" ]
then
    echo 'api_key_name variable is not set. Check the script and set proper variable.'
    exit 0
fi

if [ -z "$scopes" ]
then
    echo 'scopes variable is not set. Check the script and set proper variable.'
    exit 0
fi

api_key=$(appwrite projects createKey --json --projectId $projectId --name $api_key_name --scopes $scopes | jq -r '.secret') 

echo 'Please just ignore the parse error above as --json option in appwrite CLI returns json being slightly malformed at the end. If you can see the secret value below, the script worked ok.'
echo 'Api key secret is:'
echo $api_key
echo 'You can use it to set value of APPWRITE_FUNCTION_API_KEY field in one or multiple function variables in appwrite.json file.'
