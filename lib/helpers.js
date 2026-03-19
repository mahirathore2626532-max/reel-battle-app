export function getMediaType(uri = '') {
  const lower = uri.toLowerCase();
  if (lower.endsWith('.mp4') || lower.endsWith('.mov') || lower.endsWith('.mkv')) {
    return 'video';
  }
  return 'image';
}

export function calculateWinner(entries, votes) {
  const counts = {};
  for (const entry of entries) counts[entry.post_id] = 0;
  for (const vote of votes) {
    counts[vote.post_id] = (counts[vote.post_id] || 0) + 1;
  }

  let winnerPostId = null;
  let maxVotes = -1;

  Object.keys(counts).forEach((postId) => {
    if (counts[postId] > maxVotes) {
      maxVotes = counts[postId];
      winnerPostId = postId;
    }
  });

  return { winnerPostId, maxVotes };
}