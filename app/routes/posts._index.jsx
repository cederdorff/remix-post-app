import { json } from "@remix-run/node";
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";
import mongoose from "mongoose";
import PostCard from "../components/PostCard";
import { authenticator } from "../services/auth.server";

export const meta = () => {
  return [{ title: "Remix Post App" }];
};

export async function loader({ request }) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
  });

  // SEARCH
  const url = new URL(request.url); // Parse the URL
  const q = url.searchParams.get("q") || ""; // Get the query string

  const query = { caption: { $regex: q, $options: "i" } }; // Create a query object

  const posts = await mongoose.models.Post.find(query).populate("user"); // Find all posts that match the query

  return json({ posts, q });
}

export default function Index() {
  const { posts, q } = useLoaderData(); // Get the posts and the search query
  const submit = useSubmit(); // Get the submit function

  // Handle the search
  function handleSearch(event) {
    const isFirstSearch = q === null;
    submit(event.currentTarget, {
      replace: !isFirstSearch,
    });
  }

  return (
    <div className="page">
      <h1>Posts</h1>
      <Form className="grid-filter" id="search-form" role="search" onChange={handleSearch}>
        <label>
          Serach by caption
          <input aria-label="Search by caption" defaultValue={q} placeholder="Search" type="search" name="q" />
        </label>
      </Form>
      <section className="grid">
        {posts.map((post) => (
          <Link key={post._id} className="post-link" to={`${post._id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </section>
    </div>
  );
}
