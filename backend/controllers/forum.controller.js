import { ForumTopic, ForumComment, User } from '../models/Index.js';

export async function listForums(req, res, next) {
    try {
        const forums = await ForumTopic.findAll({
            include: { model: User, as: 'user', attributes: ['name'] },
            order: [['id', 'DESC']]
        });
        res.json(forums);
    } catch (err) { next(err); }
}

export async function addForum(req, res, next) {
    try {
        const topic = await ForumTopic.create(req.body);
        res.status(201).json(topic);
    } catch (err) { next(err); }
}

export async function updateForum(req, res, next) {
    try {
        await ForumTopic.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Updated' });
    } catch (err) { next(err); }
}

export async function deleteForum(req, res, next) {
    try {
        await ForumTopic.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Deleted' });
    } catch (err) { next(err); }
}

export async function listComments(req, res, next) {
  try {
    const comments = await ForumComment.findAll({
      where: { topic_id: req.params.topicId },
      include: { model: User, as: 'user', attributes: ['name'] },
      order: [['id', 'ASC']],
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
}


export async function addComment(req, res, next) {
  try {
    const payload = {
      comment:  req.body.c,
      user_id:  req.body.user_id,
      topic_id: +req.params.topicId
    };
    const comment = await ForumComment.create(payload);
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
}

export async function updateComment(req, res, next) {
    try {
        await ForumComment.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Updated' });
    } catch (err) { next(err); }
}

export async function deleteComment(req, res, next) {
    try {
        await ForumComment.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Deleted' });
    } catch (err) { next(err); }
}
