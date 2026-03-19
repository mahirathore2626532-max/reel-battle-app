export function sortPostsByTrending(posts = [], likesMap = {}, commentsMap = {}, savesMap = {}) {
  return [...posts].sort((a, b) => {
    const aScore =
      (likesMap[a.id] || 0) * 3 +
      (commentsMap[a.id] || 0) * 4 +
      (savesMap[a.id] || 0) * 5;

    const bScore =
      (likesMap[b.id] || 0) * 3 +
      (commentsMap[b.id] || 0) * 4 +
      (savesMap[b.id] || 0) * 5;

    return bScore - aScore;
  });
}