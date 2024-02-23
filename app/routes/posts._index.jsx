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

  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const sortBy = url.searchParams.get("sort-by") || "createdAt";
  const filterTag = url.searchParams.get("tag") || "";

  // Assuming you want to sort in ascending order.
  // If you need descending order for some fields, you might need to adjust the logic accordingly.
  const sortOption = {};
  sortOption[sortBy] = sortBy != "caption" ? -1 : 1; // Use -1 here if you want to sort in descending order by default

  const query = { caption: { $regex: q, $options: "i" } };
  if (filterTag) {
    query.tags = filterTag;
  }
  const posts = await mongoose.models.Post.find(query).sort(sortOption).populate("user");

  const uniqueTags = await mongoose.models.Post.aggregate([
    // Unwind the array of tags to make each tag a separate document
    { $unwind: "$tags" },
    // Group by the tag to eliminate duplicates
    { $group: { _id: "$tags" } },
    // Optionally, you might want to sort the tags alphabetically
    { $sort: { _id: 1 } },
    // Project to get the desired output format, if needed
    { $project: { tag: "$_id", _id: 0 } },
  ]);

  // Extract just the tags from the results
  const tags = uniqueTags.map((tagDoc) => tagDoc.tag);

  return json({ posts, tags, q, sortBy, filterTag });
}

export default function Index() {
  const { posts, tags, q, sortBy, filterTag } = useLoaderData();
  const submit = useSubmit();

  function handleSearchFilterAndSort(event) {
    const isFirstSearch = q === null;
    submit(event.currentTarget, {
      replace: !isFirstSearch,
    });
  }

  return (
    <div className="page">
      <h1>Posts</h1>
      <Form className="grid-filter" id="search-form" role="search" onChange={handleSearchFilterAndSort}>
        <label>
          Serach by caption{" "}
          <input aria-label="Search by caption" defaultValue={q} placeholder="Search" type="search" name="q" />
        </label>
        <label>
          Filter by tag{" "}
          <select name="tag" defaultValue={filterTag}>
            <option value="">select tag</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by{" "}
          <select name="sort-by" defaultValue={sortBy}>
            <option value="createdAt">newest</option>
            <option value="caption">caption</option>
            <option value="likes">most likes</option>
          </select>
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
