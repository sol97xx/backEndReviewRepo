const routes = 
"GET requests"+
" /api/topics "+
" Responds with a list of all topics "+
" /api/users/:username: "+
" Responds with the specified user's username, avatar url and name "+
"/api/articles/:article_id:"+
" Responds with the specified article and all relevant information "+
" /api/articles: "+
" Responds with a list of all articles and relevant information for each "+
" api/articles/:article_id/comments: "+
" Responds with a list of comments for the specified article "+
" /api: "+
" Responds with a list of available endpoints "+
" PATCH requests "+
" /api/articles/:article_id "+
" Endpoint for up/downvoting the specified article "+
" /api/comments/:comment_id "+
" Endpoint for up/downvoting the specified comment "+
" POST requests "+
" /api/articles/:article_id/comments "+
" Endpoint for posting a comment "+
" DELETE requests "+
" /api/comments/:comment_id "+
" Endpoint for deleting the specified comments "

module.exports = routes