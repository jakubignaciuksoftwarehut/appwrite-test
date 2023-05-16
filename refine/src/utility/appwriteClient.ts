import { Account, Appwrite, Storage } from "@refinedev/appwrite";

const APPWRITE_URL = "http://YOUR_COOL_APPWRITE_API/v1";
const APPWRITE_PROJECT = "YOUR_APPWRITE_PROJECT_ID";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);

export { appwriteClient, account, storage };