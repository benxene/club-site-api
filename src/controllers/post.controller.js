import Logger from 'js-logger';

import { Post } from '../models';

export const newPost = async (req, res) => {
  const { body } = req;
  Logger.debug('Acknowledged: ', body);
  const theNewPost = new Post(body);

  try {
    const postDocument = await theNewPost.save();
    Logger.debug('Post created successfully.');
    return res.status(200).json({ message: 'Successfully posted', data: postDocument });
  } catch (err) {
    Logger.debug(err);
    return res.status(500).json({ message: 'Could not create post', error: err });
  }
};

export const getPosts = async (_req, res) => {
  try {
    const posts = await Post.find({}, { __v: 0 });
    return res.status(200).json({ message: 'All posts', data: posts });
  } catch (error) {
    Logger.error('Error retrieving posts', error);
    return res.status(500).json({ message: 'Error retrieving posts', error });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    return res.status(200).json({ message: 'Post retrieved', data: post });
  } catch (error) {
    Logger.error('Error retrieving post', error);
    return res.status(500).json({ message: 'Error retrieving post', error });
  }
};
