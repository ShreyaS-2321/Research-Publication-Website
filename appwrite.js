import { Client, Account,Databases,Storage } from "appwrite";


// Initialize the Appwrite client
const client = new Client();

// Set the endpoint and project ID
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite API endpoint
  .setProject("67950eef0033e1e08784"); // Replace with your actual project ID

// Initialize the account instance with the configured client
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Export account object for usage in other files
export { account };
