import { redirect } from "@remix-run/node";
import mongoose from "mongoose";

export async function action({ params }) {
  const result = await mongoose.model("Post").deleteOne({ _id: params.postId });

  if (result.acknowledged) {
    return redirect("/posts");
  }
}
