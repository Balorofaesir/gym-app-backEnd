import { DocumentDefinition, FilterQuery } from "mongoose";

import Activity, { ActivityDocument } from "./activities.model";

export function getAllActivities() {
  return Activity.find({})
}

export function getActivityById(id: string, createdBy: string) {
  return Activity.find({ _id: id, createdBy: createdBy }).populate({
    path: "createdBy",
    select: "Username",
  });
  // .populate('createdBy');
}

export async function searchActivity(filter?: FilterQuery<ActivityDocument>) {
  const activities = filter ? await Activity.find(filter) : await Activity.find();
  return activities;
}

export async function createActivity(
  input: DocumentDefinition<Omit<ActivityDocument, "createdAt" | "updatedAt">>
) {
  return Activity.create(input);
}

export function addSingleActivity(id: string, createdBy: string, data: object) {
  return Activity.findOneAndUpdate(
    { _id: id, createdBy: createdBy },
    { $push: data },
    { new: true }
  );
}

export function deleteSingleActivity(id: string, createdBy: string, data: object) {
  return Activity.findOneAndUpdate(
    { _id: id, createdBy: createdBy },
    //had to pass all the same values of the object in the array to be able to erase
    {
      $pull: { activities: { $in: [data] }},
    },
    { new: true }
  );
}

export function deleteActivity(id: string, createdBy: string) {
  return Activity.findOneAndRemove({ _id: id, createdBy: createdBy });
}
