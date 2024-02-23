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

  const posts = await mongoose.models.Post.find().sort({ createdAt: -1 }).populate("user");

  return json({ posts });
}

export default function Index() {
  const { posts, q } = useLoaderData();
  const submit = useSubmit();

  function handleSearchOnChange(event) {
    const isFirstSearch = q === null;
    submit(event.currentTarget, {
      replace: !isFirstSearch,
    });
  }
  return (
    <div className="page">
      <h1>Posts</h1>
      <div className="grid-filter">
        <Form id="search-form" role="search" onChange={handleSearchOnChange}>
          <label>
            Serach by caption{" "}
            <input aria-label="Search by caption" defaultValue={q || ""} placeholder="Search" type="search" name="q" />
          </label>
        </Form>
        <Form id="sort-form">
          <label>
            Sort by{" "}
            <select name="sort-by">
              <option value="date" selected>
                date
              </option>
              <option value="caption">caption</option>
              <option value="likes">likes</option>
              <option value="user-name">user name</option>
              <option value="user-title">user title</option>
            </select>
          </label>
        </Form>
        <Form id="filter-by-tag-form">
          <label>
            Filter by tag{" "}
            <select name="filter-by-tag-form">
              <option value="">select tag</option>
              <option value="aarhus">aarhus</option>
              <option value="date">date</option>
              <option value="user-name">user name</option>
              <option value="user-title">user title</option>
            </select>
          </label>
        </Form>
      </div>
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
