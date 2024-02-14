import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { mapFirebaseDocument } from "../helpers/firebaseDataMapper";
import PostCard from "../components/PostCard";

export function meta({ data }) {
  return [
    {
      title: `Remix Post App - ${data.post.caption || "Post"}`
    }
  ];
}

export async function loader({ params }) {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/race-photo-app/databases/(default)/documents/photos/${params.postId}`
  );
  const docs = await response.json();
  const post = mapFirebaseDocument(docs);
  return json({ post });
}

export default function Post() {
  const { post } = useLoaderData();

  function confirmDelete(event) {
    const response = confirm("Please confirm you want to delete this post.");
    if (!response) {
      event.preventDefault();
    }
  }

  return (
    <div id="post-page" className="page">
      <h1>{post.caption}</h1>
      <PostCard post={post} />
      <div className="btns">
        <Form action="update">
          <button>Update</button>
        </Form>
        <Form action="destroy" method="post" onSubmit={confirmDelete}>
          <button>Delete</button>
        </Form>
      </div>
    </div>
  );
}
