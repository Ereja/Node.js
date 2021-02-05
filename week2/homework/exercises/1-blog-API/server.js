const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

//util functions
const { checkIfExist, createFile, getPost } = require("./utils");

// YOUR CODE GOES IN HERE
app.use(express.json()); //parse body to json

//creating a new blog post
app.post("/blogs", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (!req.body.title || !req.body.content) {
    res.send("Please enter a title and cotent!");
  } else {
    //removing spaces
    const id = req.body.title.replace(/\s+/g, "");
    let posts = {
      id,
      title: req.body.title,
      content: req.body.content,
    };
    const postsJSON = JSON.stringify(posts);
    createFile("blogPosts", `${posts.id}.json`, postsJSON);

    res.status(201);
    res.end("The blog post was succesfully added!");
  }
});

//updating already exsisting post
app.put("/posts/:title", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const title = req.params.title;

  if (checkIfExist("blogPosts", `${title}.json`)) {
    const postContent = getPost("blogPosts", `${title}.json`);

    if (!req.body.title) {
      postContent.title;
      postContent.content = req.body.content;
    } else if (!req.body.content) {
      postContent.title = req.body.title;
      postContent.content;
    } else {
      postContent.title = req.body.title;
      postContent.content = req.body.content;
    }

    const postsJSON = JSON.stringify(postContent);

    createFile("blogPosts", `${title}.json`, postsJSON);
    res.status(200);
    res.end("The blog post was updated succesfully");
  } else {
    res.status(404);
    res.end("The blog post was not found!");
  }
});

//deleting an existing post
app.delete("/blogs/:title", (req, res) => {
  const title = req.params.title;
  if (checkIfExist("blogPosts", `${title}.json`)) {
    fs.unlinkSync(path.join(__dirname, "blogPosts", `${title}.json`));
    res.status(202);
    res.end("The blog post was succesfully deleted");
  } else {
    res.status(404);
    res.end("The blog post was not found!");
  }
});

//read a specific blog post
app.get("/blogs/:title", (req, res) => {
  const title = req.params.title;

  if (checkIfExist("blogPosts", `${title}.json`)) {
    const blogPost = getPost("blogPosts", `${title}.json`);
    res.status(200);
    res.end(`Title: ${blogPost.title}, content: ${blogPost.content}`);
  } else {
    res.status(404);
    res.end("The blog post was not found!");
  }
});

//read all existing blog posts
app.get("/blogs", (req, res) => {
  const allPosts = fs.readdirSync(path.join(__dirname, "blogPosts"));
  const getPosts = allPosts.map(post => getPost("blogPosts", post));
  res.status(200);
  res.end(`Here are all the blog posts:
  ${getPosts.map(post => `Title: ${post.title}`).join("\n")}`);
});

app.listen(3000);
