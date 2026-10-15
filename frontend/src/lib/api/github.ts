import { getJson } from './client';
import { links, githubUsername } from '../links';
export interface GitHubProfile {
  repositories: number;
  followers: number;
  following: number;
}
function parseProfile(value: unknown): GitHubProfile {
  if (!value || typeof value !== 'object') throw new Error('Invalid profile');
  const profile = value as Record<string, unknown>;
  if (
    typeof profile.login !== 'string' ||
    profile.login.toLowerCase() !== githubUsername.toLowerCase()
  )
    throw new Error('Invalid profile');
  const counts = [profile.public_repos, profile.followers, profile.following];
  if (
    !counts.every(
      (count) =>
        typeof count === 'number' && Number.isSafeInteger(count) && count >= 0,
    )
  )
    throw new Error('Invalid profile');
  return {
    repositories: counts[0] as number,
    followers: counts[1] as number,
    following: counts[2] as number,
  };
}
export function getGitHubProfile(signal: AbortSignal) {
  return getJson(links.githubProfileApi, parseProfile, signal);
}
