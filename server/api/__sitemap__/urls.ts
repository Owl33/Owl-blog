import { useNuxtApp } from "nuxt/app";

export default defineSitemapEventHandler(async (e) => {
  const { $api } = useNuxtApp();
  //@ts-ignore
  const posts = await $api("/v1/posts");
  return posts.data.map((post: any) => {
    return {
      loc: `/posts/${post.postId}`,
      _sitemap: "pages",
      // modifiedAt: new Date(post.creation_at),
    };
  });
});
