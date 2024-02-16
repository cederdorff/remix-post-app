import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "../services/auth.server";

export const meta = () => {
  return [{ title: "Remix Post App" }];
};

export async function loader({ request }) {
  // return redirect("/posts");
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/posts",
    failureRedirect: "/login"
  });
}

export async function action({ request }) {
  await authenticator.logout(request, { redirectTo: "/login" });
}
