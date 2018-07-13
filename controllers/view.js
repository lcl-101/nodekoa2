const _ = require('lodash');

module.exports.Home = async function (ctx, next) {
  console.log('request.url =======' + ctx.url);
  await ctx.render('index');
}

module.exports.About = async function (ctx, next) {
  console.log('request.url =======' + ctx.url);
  await ctx.render('index');
}

module.exports.Posts = async function (ctx, next) {
  console.log('request.url =======' + ctx.url);
  await ctx.render('index');
}

module.exports.Detail = async function (ctx, next) {
  console.log('request.url =======' + ctx.url);
  await ctx.render('index');
}

module.exports.Projects = async function (ctx, next) {
  console.log('request.url =======' + ctx.url);
  await ctx.render('index');
}

module.exports.Tags = async function (ctx, next) {
  console.log('request.url =======' + ctx.url);
  await ctx.render('index');
}
