const Post = require("../../model/Post");
const { transformPost } = require("./merge");

module.exports = {
  posts: async () => {
    const posts = await Post.find().sort("-createdAt");
    try {
      return posts.map(post => {
        const retorno = transformPost(post);
        console.log(retorno);
        return retorno;
      });
    } catch (err) {
      throw err;
    }
  },
  createPost: async args => {
    console.log(args);
    return;
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split(".");
    const fileName = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, "resized", fileName));
    fs.unlink(req.file.path);
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      fileName
    });
    req.io.emit("post", post);
    return res.json(post);
  }
};
