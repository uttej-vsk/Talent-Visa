"use server";
import {
  getAllJobs as getJobsFromDb,
  getJobById as getJobByIdFromDb,
  addPostedJobToDb,
  addSharedJobToDb,
} from "@/lib/db";

export async function createJob(formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const location = formData.get("location");
  const salary = formData.get("salary");
  const type = formData.get("type");
  const companyName = formData.get("companyName");
  const applicationURL = formData.get("applicationURL");

  console.log({
    title,
    description,
    location,
    salary,
    type,
    companyName,
    applicationURL,
  });

  await addPostedJobToDb({
    title,
    description,
    location,
    salary,
    type,
    companyName,
    applicationURL,
  });
  // Update data
  // Revalidate cache
}

export async function shareJob(formData: FormData) {
  const source = formData.get("source");
  const customSource = formData.get("customSource");
  const postURL = formData.get("postURL");

  console.log({
    source,
    customSource,
    postURL,
  });

  await addSharedJobToDb({
    source,
    customSource,
    postURL,
    isShared: true,
  });
  // Update data
  // Revalidate cache
}

// Server action to get job by ID
export async function getJobById(id: string) {
  try {
    return await getJobByIdFromDb(id);
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return null;
  }
}

// Server action to get all jobs
export { getJobsFromDb as getAllJobs };
