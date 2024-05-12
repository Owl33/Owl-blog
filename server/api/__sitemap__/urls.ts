export default defineSitemapEventHandler(async (e) => {
  const data = await fetch("https://back.owlblog.site/v1/posts")
    .then((res) => res.json())
    .then((data) => data.data);

  return data.map((post: any) => {
    return {
      loc: `/posts/${post.postId}`,
      _sitemap: "pages",
      // modifiedAt: new Date(post.creation_at),
    };
  });
});
