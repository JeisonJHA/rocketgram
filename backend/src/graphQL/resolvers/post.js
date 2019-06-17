const Post = require("../../model/Post");
const sharp = require("sharp");
const fs = require("fs");
const { transformPost } = require("./merge");
const { createWriteStream } = require("fs");
const path = require("path");

module.exports = {
  posts: async () => {
    const posts = await Post.find()
      .sort("-createdAt")
      .populate("comment");
    try {
      return posts.map(post => {
        const retorno = transformPost(post);
        return retorno;
      });
    } catch (err) {
      throw err;
    }
  },
  likePost: async (data, req) => {
    const post = await Post.findById(data.postId);

    post.likes += 1;

    await post.save();
    req.io.emit("like", post);
    return post;
  },
  createPost: async (args, req) => {
    const { author, place, description, hashtags } = args.postInput;

    const { createReadStream, filename } = await args.postInput.image;

    const [name] = filename.split(".");
    const image = `${name}.jpg`;
    const dir = path.join(__dirname, "..", "..", "../uploads");
    const filePath = path.join(dir, image);
    await new Promise(res =>
      createReadStream()
        .pipe(createWriteStream(filePath))
        .on("close", res)
    );
    await sharp(filePath)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(dir, "resized", image));
    fs.unlinkSync(filePath);
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image
    });
    req.io.emit("post", post);
    return post;
  }
};
