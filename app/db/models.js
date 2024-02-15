import mongoose from "mongoose";
import { Mongoose } from "mongoose";

// schemas
const userSchema = new mongoose.Schema(
  {
    image: String,
    mail: String,
    name: String,
    title: String
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    caption: String,
    image: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: new mongoose.Types.ObjectId("65cde4cb0d09cb615a23db17")
    }
  },
  { timestamps: true }
);
// define models
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

export const models = [
  { name: "User", schema: userSchema, collection: "users" },
  { name: "Post", schema: postSchema, collection: "posts" }
];

// ========== Export - initModels ========== //

export async function initData() {
  // check if data exists
  const userCount = await User.countDocuments();
  const postCount = await Post.countDocuments();

  if (userCount === 0 || postCount === 0) {
    console.log("Inserting data...");
    const User = mongoose.model("User");
    const Post = mongoose.model("Post");

    await User.collection.drop();
    await Post.collection.drop();

    // Insert users
    const maria = await User.create({
      image:
        "https://www.baaa.dk/media/b5ahrlra/maria-louise-bendixen.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921650330000&format=webp",
      mail: "mlbe@eaaa.dk",
      name: "Maria Louise Bendixen",
      title: "Senior Lecturer"
    });

    const rasmus = await User.create({
      _id: new mongoose.Types.ObjectId("65cde4cb0d09cb615a23db17"),
      image: "https://share.cederdorff.dk/images/race.webp",
      mail: "race@eaaa.dk",
      name: "Rasmus Cederdorff",
      title: "Senior Lecturer"
    });

    const anne = await User.create({
      image:
        "https://www.baaa.dk/media/5buh1xeo/anne-kirketerp.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921531600000&format=webp",
      mail: "anki@eaaa.dk",
      name: "Anne Kirketerp",
      title: "Head of Department"
    });

    const line = await User.create({
      image: "https://www.eaaa.dk/media/14qpfeq4/line-skjodt.jpg?width=800&height=450&rnd=133178433559770000",
      mail: "lskj@eaaa.dk",
      name: "Line Skjødt",
      title: "Senior Lecturer & Internship Coordinator"
    });

    const dan = await User.create({
      image:
        "https://www.eaaa.dk/media/bdojel41/dan-okkels-brendstrup.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921559630000&format=webp",
      mail: "dob@eaaa.dk",
      name: "Dan Okkels Brendstrup",
      title: "Lecturer"
    });

    // Insert posts
    await Post.insertMany([
      {
        caption: "Beautiful sunset at the beach",
        image:
          "https://images.unsplash.com/photo-1566241832378-917a0f30db2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        user: maria._id
      },
      {
        caption: "Exploring the city streets of Aarhus",
        image:
          "https://images.unsplash.com/photo-1559070169-a3077159ee16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        user: rasmus._id
      },
      {
        caption: "Delicious food at the restaurant",
        image:
          "https://images.unsplash.com/photo-1548940740-204726a19be3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        user: line._id
      },
      {
        caption: "Exploring the city center of Aarhus",
        image:
          "https://images.unsplash.com/photo-1612624629424-ddde915d3dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        user: rasmus._id
      },
      {
        caption: "A cozy morning with coffee",
        image:
          "https://images.unsplash.com/photo-1545319261-f3760f9dd64d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        user: dan._id
      },
      {
        caption: "Serenity of the forest",
        image:
          "https://images.unsplash.com/photo-1661505216710-32316e7b5bb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        user: rasmus._id
      },
      {
        caption: "A beautiful morning in Aarhus",
        image:
          "https://images.unsplash.com/photo-1573997953524-efed43db70a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        user: maria._id
      },
      {
        caption: "Rainbow reflections of the city of Aarhus",
        image:
          "https://images.unsplash.com/photo-1558443336-dbb3de50b8b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        user: anne._id
      },
      {
        caption: "The city streets of Aarhus ✨",
        image:
          "https://images.unsplash.com/photo-1596150368199-1dddc9fc34cc?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        user: rasmus._id
      }
    ]);
  }
}
