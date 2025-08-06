

const graphql = require('graphql');
const Post = require('../models/Post');
const {
  GraphQLObjectType, GraphQLString,
  GraphQLID, GraphQLSchema,
  GraphQLList, GraphQLNonNull
} = graphql;

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    content: { type: GraphQLString },
    img: { type: GraphQLString },
    datePosted: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      resolve: () => Post.find().sort({ datePosted: -1 }),
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve: (_, { id }) => Post.findById(id),
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPost: {
      type: PostType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        subtitle: { type: GraphQLString },
        content: { type: GraphQLString },
        img: { type: GraphQLString },
      },
      resolve: (_, args) => {
        const post = new Post({ ...args, datePosted: new Date().toISOString() });
        return post.save();
      },
    },
    deletePost: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, { id }) => Post.findByIdAndDelete(id),
    },
    editPost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        subtitle: { type: GraphQLString },
        content: { type: GraphQLString },
        img: { type: GraphQLString },
      },
      resolve: (_, { id, title, subtitle, content, img }) =>
        Post.findByIdAndUpdate(id, { title, subtitle, content, img }, { new: true }),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
