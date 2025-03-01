export const formatInfluencerNameToId = (influencerName: string): string => {
  return influencerName
    .toLowerCase()
    .replace(/[ .,()]/g, '-')
    .replace(/-+/g, '-');
}