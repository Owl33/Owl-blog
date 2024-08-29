export default defineSitemapEventHandler(async (e) => {
  const posts: any = await $fetch("https://back.owlblog.site/v1/posts");
  return posts.data.map((post: any) => {
    return {
      loc: `/posts/${post.postId}`,
      _sitemap: "pages",
      // modifiedAt: new Date(post.creation_at),
    };
  });
});
