import { redirect } from "@remix-run/node";
import mongoose from "mongoose";
import { authenticator } from "../services/auth.server";

export async function loader({ request }) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin"
  });
}

export async function action({ params }) {
  await mongoose.models.Post.findByIdAndDelete(params.postId);
  return redirect("/posts");
}
