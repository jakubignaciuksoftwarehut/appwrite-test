# This script is to be used for fetching data from cloud/local appwrite instance with the assumption user is already logged in
# and has the project initiated. One example of when it could be useful is when user does some changes in the appwrite console and
# wants to fetch them to have the appwrite.json file updated (so it can be for example commited to repo or just used as look up method).
#

# Fetch databases and collections
appwrite init collection --all --yes

# Fetch teams
appwrite init team --all --yes

# Fetch buckets
appwrite init bucket --all --yes
