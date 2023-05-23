import { Account, Appwrite, Storage } from "@refinedev/appwrite";
import { Server } from "./config";

const APPWRITE_URL = Server.endpoint;
const APPWRITE_PROJECT = Server.project;

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);

export { appwriteClient, account, storage };