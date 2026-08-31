const ForumPost = require('../models/ForumPost');

const seedForumPosts = [
    {
        authorName: 'Suresh Patil (Farmer, Sangli)',
        title: 'Best irrigation technique for Sugarcane in low rain season?',
        category: 'Crop Advice',
        content: 'Our region received 30% less rainfall this monsoon. Should I switch to drip irrigation or alternate furrow irrigation for 5 acres of sugarcane?',
        likes: 12,
        replies: [
            {
                authorName: 'Dr. R. K. Sharma (Agronomist)',
                comment: 'Drip irrigation saves up to 45% water and improves cane yield by 20-25%. Government subsidies up to 80% are available in Maharashtra!'
            },
            {
                authorName: 'Mahesh Deshmukh (Farmer)',
                comment: 'I installed subsurface drip 2 years ago. Water saving is huge and weed growth reduced significantly.'
            }
        ]
    },
    {
        authorName: 'Anil Kumar (Farmer, Karnal)',
        title: 'How to manage Yellow Rust in Wheat crops organically?',
        category: 'Pest Control',
        content: 'Noticed early signs of yellow spots on wheat leaves. Looking for bio-fungicide remedies or preventive organic sprays.',
        likes: 8,
        replies: [
            {
                authorName: 'Venkatesh Rao (Bio-expert)',
                comment: 'Spraying Sour Buttermilk (Lassi) mixed with copper vessel solution (10-15 days old) acts as a strong bio-fungicide!'
            }
        ]
    }
];

const getForumPosts = async (req, res) => {
    try {
        let posts = await ForumPost.find().sort({ createdAt: -1 });
        if (posts.length === 0) {
            posts = await ForumPost.insertMany(seedForumPosts.map(p => ({
                ...p,
                authorId: '650000000000000000000000'
            })));
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching forum posts', error: error.message });
    }
};

const createForumPost = async (req, res) => {
    try {
        const { authorId, authorName, title, category, content } = req.body;
        if (!authorId || !authorName || !title || !content) {
            return res.status(400).json({ message: 'authorId, authorName, title, and content are required' });
        }
        const post = new ForumPost({ authorId, authorName, title, category, content });
        await post.save();
        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

const addReply = async (req, res) => {
    try {
        const { id } = req.params;
        const { authorName, authorId, comment } = req.body;
        if (!authorName || !comment) {
            return res.status(400).json({ message: 'authorName and comment are required' });
        }
        const post = await ForumPost.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.replies.push({ authorName, authorId, comment, createdAt: new Date() });
        await post.save();
        res.status(200).json({ message: 'Reply added', post });
    } catch (error) {
        res.status(500).json({ message: 'Error adding reply', error: error.message });
    }
};

const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await ForumPost.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
        res.status(200).json({ message: 'Liked post', post });
    } catch (error) {
        res.status(500).json({ message: 'Error liking post', error: error.message });
    }
};

module.exports = { getForumPosts, createForumPost, addReply, likePost };
