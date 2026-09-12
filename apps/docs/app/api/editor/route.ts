import { createEditorHandler } from 'fumadocs-editor/server';

const owner =
  process.env.FUMADOCS_EDITOR_REPO_OWNER ?? process.env.VERCEL_GIT_REPO_OWNER ?? 'GiovanniSchiavo';
const repo =
  process.env.FUMADOCS_EDITOR_REPO_NAME ?? process.env.VERCEL_GIT_REPO_SLUG ?? 'fumadocs';
const clientId = process.env.FUMADOCS_EDITOR_CLIENT_ID;
const clientSecret = process.env.FUMADOCS_EDITOR_CLIENT_SECRET;
const sessionSecret = process.env.FUMADOCS_EDITOR_SESSION_SECRET;
const configured = Boolean(clientId && clientSecret && sessionSecret);

export const { GET, POST } = createEditorHandler({
  dir: 'content/docs',
  docsBaseUrl: '/docs',
  // Visitors without push access propose edits from their own fork.
  allowForks: true,
  media: {
    publicDir: 'public',
    publicFolders: ['', 'blog', 'docs', 'showcases', 'themes'],
  },
  repository: {
    provider: 'github',
    owner,
    repo,
    baseBranch: process.env.FUMADOCS_EDITOR_BASE_BRANCH ?? 'dev',
    contentDir: 'apps/docs/content/docs',
    publicDir: 'apps/docs/public',
  },
  auth:
    configured && clientId && clientSecret && sessionSecret
      ? {
          clientId,
          clientSecret,
          sessionSecret,
          // Needed by an OAuth app; a GitHub App ignores it and uses the
          // permissions it was installed with.
          scope: 'public_repo',
          repository: { owner, repo },
        }
      : undefined,
});
