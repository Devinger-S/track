export const getTimeDifference = (createdAt: Date, updatedAt: Date): string => {
    // Convert date strings to Date objects
    const createdDate = new Date(createdAt);
    const updatedDate = new Date(updatedAt);

    // Calculate the difference in milliseconds
    const differenceInMs: number =
      updatedDate.getTime() - createdDate.getTime();
    const differenceInSec: number = Math.floor(differenceInMs / 1000); // Convert to seconds

    // Calculate time differences
    const seconds: number = differenceInSec % 60;
    const minutes: number = Math.floor((differenceInSec / 60) % 60);
    const hours: number = Math.floor((differenceInSec / 3600) % 24);
    const days: number = Math.floor(differenceInSec / (3600 * 24));

    // Format the output
    let result: string = "";
    if (days > 0) {
      result += `${days} day${days > 1 ? "s" : ""}, `;
    }
    if (hours > 0) {
      result += `${hours} hour${hours > 1 ? "s" : ""}, `;
    }
    if (minutes > 0) {
      result += `${minutes} minute${minutes > 1 ? "s" : ""}, `;
    }
    result += `${seconds} second${seconds > 1 ? "s" : ""}`;

    return result;
  };