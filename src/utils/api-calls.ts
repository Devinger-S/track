import { Activity, Client } from "@prisma/client";

 export async function getActivities() {
    try {
      const response = await fetch("/api/activity/getActivities", {
        method: "GET",
        credentials: "include", // Ensures session cookies are sent with the request (for authentication)
      });
      if (!response.ok) {
        throw new Error(`Error fetching activities: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      
      throw new Error("Failed to fetch daily activities");
    }
  }
  export async function getCurrent() {
    try {
      const response = await fetch("/api/activity/getCurrentActivity",{
        method:'GET',
        credentials:'include',
      });
      const data = await response.json();
      return data;

    } catch (error) {throw new Error("Failed to fetch current activity");}
  }

 export async function getClients() {
    try {
      const response = await fetch("/api/activity/getClients", {
        method: "GET",
        credentials: "include", // Ensures session cookies are sent with the request (for authentication)
      });
      if (!response.ok) {
        throw new Error(`Error fetching activities: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      
      throw new Error("Failed to fetch daily activities");
    }
  }

 export async function getProjects() {
    try {
      const response = await fetch("/api/activity/getProjects", {
        method: "GET",
        credentials: "include", // Ensures session cookies are sent with the request (for authentication)
      });
      if (!response.ok) {
        throw new Error(`Error fetching projects: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      
      throw new Error("Failed to fetch projects");
    }
  }
  export const createClient = async ({name,userId}:{name:string,userId:string}) => {
    try {
      const response = await fetch("/api/activity/postClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name,userId}), 
      });
      if (!response.ok) {
        throw new Error(`Error creating client: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      
      throw new Error("Failed to create client");
    }
  }
  export const createProject = async ({name,userId}:{name:string,userId:string}) => {
    try {
      const response = await fetch("/api/activity/postProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name,userId}), 
      });
      if (!response.ok) {
        throw new Error(`Error creating project: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      
      throw new Error("Failed to create project");
    }
  }
    export const postActivity = async (newActivity: any) => {
    const response = await fetch(
      newActivity.id ? "/api/activity/stop" : "/api/activity/upsert",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newActivity),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to post activity");
    }

    return response.json();
  };

