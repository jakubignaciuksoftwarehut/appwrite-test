export const Server = {
  endpoint : process.env.REACT_APP_ENDPOINT as string,
  project: process.env.REACT_APP_PROJECT as string,
  databaseID : process.env.REACT_APP_DATABASE_ID as string,
  collectionID : process.env.REACT_APP_COLLECTION_ID as string,
}