const db = require('../common/database');
const q = require('q');

const conn = db.getConnection();

function getAllPost()
{
    const defer = q.defer();

    conn.query('SELECT * FROM posts', (err, result) => {
        if (err)
            defer.reject(err);
        else 
            defer.resolve(result);
    });

    return defer.promise;
};

function addPost(post)
{
    const defer = q.defer();

    conn.query('INSERT INTO posts SET ?', post, (err, result) => {
        if (err)
            defer.reject(err);
        else 
            defer.resolve(result);
    });

    return defer.promise;
}

function getPostById(id)
{
    const defer = q.defer();

    conn.query('SELECT * FROM posts WHERE ?', id, (err, result) => {
        if (err)
            defer.reject(err);
        else 
            defer.resolve(result);
    });

    return defer.promise;
}

function updatePost(post)
{
    const defer = q.defer();

    conn.query(`UPDATE posts SET
        title = "${post.title}", 
        content = "${post.content}",
        author = "${post.author}",
        updated_at = "${new Date()}" WHERE id = ${post.id}`, (err, result) => {
            if (err)
                defer.reject(err);
            else 
                defer.resolve(result);
        });

    return defer.promise;
}

function deletePostById(id)
{
    const defer = q.defer();

    conn.query(`DELETE FROM posts WHERE id = ${id}`, (err, result) => {
        if (err)
            defer.reject(err);
        else 
            defer.resolve(result);
    });

    return defer.promise;
}

exports.getAllPost = getAllPost;
exports.addPost = addPost;
exports.getPostById = getPostById;
exports.updatePost = updatePost;
exports.deletePostById = deletePostById;