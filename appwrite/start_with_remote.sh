# This script is to be used for fetching data from cloud/local appwrite instance(for example the one running via docker) 
# and to fetch project resources(databases, collections, teams, buckets) to create local appwrite.json
# Please keep in mind that if you are not planning to modify the resorces(but for example just manipulate the data inside them)
# you most likely dont need it at all. It can be used to have a way for easy resources look up, but if you have a way to log in
# to appwrite console(which you need anyway for running this script) you can always check the resources there.
# This script will be useful usually when you plan to change the resources and commit new appwrite.json file to repository,
# making it possible for others to use new, changed structure.
# If your local/development environment is in cloud, you most likely dont need that script at all as everyone can sync the changes
# just by fetching new resources.
#
# Important! When initiating project, you are supposed to pick 'Link this directory to an existing appwrite project' 
#             to make it work as otherwise you will just create empty project.
#
# Important! At the moment of writing this, there was no command to fetch functions data and update in directly in the appwrite.json
#            file (which is strange, considering functions can be deployed from here). Ideally its best as the creator of the function
#            commits the function data(the one which should be in appwrite.json somewhere(as you need to have the 
#            code delivered the same way aswell). If that's the case, you can manualy add 'functions' field to appwrite.json file
#            after running this script. But at the same time it will most likely mean you dont really need to run the script, as you
#            probably have access to proper appwrite.json already -_- . 
#            Most likely, if the functions are defined in the project, asking the author how to use them is the best option.
#

# Start by logging in. You can log in both to cloud or local.
appwrite login

echo 'Read this before you continue!\nAs this script should be used for connecting to already existing project and fetching the resources, pick the "Link this directory to an existing appwrite project" option when asked how would you like to start.\n'

# Init new project. 
appwrite init project

# Fetch databases and collections
appwrite init collection --all --yes

# Fetch teams
appwrite init team --all --yes

# Fetch buckets
appwrite init bucket --all --yes
