import { getLayoutTabs } from 'fumadocs-ui/layouts/shared';
import { baseOptions, linkItems, logo } from '@/components/layouts/shared';
import { source } from '@/lib/source';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/inkeep/search';
import { getSection } from '@/lib/source/navigation';
import { MessageCircleIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import type { CSSProperties, ReactNode } from 'react';
import type { RepositorySession } from 'fumadocs-editor';
import { EditorShell } from '@/components/editor/provider';
import 'katex/dist/katex.min.css';

function repository(): RepositorySession {
  return {
    provider: 'github',
    owner:
      process.env.FUMADOCS_EDITOR_REPO_OWNER ??
      process.env.VERCEL_GIT_REPO_OWNER ??
      'GiovanniSchiavo',
    repo: process.env.FUMADOCS_EDITOR_REPO_NAME ?? process.env.VERCEL_GIT_REPO_SLUG ?? 'fumadocs',
    baseBranch: process.env.FUMADOCS_EDITOR_BASE_BRANCH ?? 'dev',
    contentDir: 'apps/docs/content/docs',
    publicDir: 'apps/docs/public',
  };
}

export function DefaultLayout({ children }: { children: ReactNode }) {
  const base = baseOptions();
  const tree = source.getPageTree();
  const tabs = getLayoutTabs(tree, {
    transform(option, node) {
      const meta = source.getNodeMeta(node);
      if (!meta || !node.icon) return option;
      const color = `var(--${getSection(meta.path)}-color, var(--color-fd-foreground))`;

      return {
        ...option,
        icon: (
          <div
            className="[&_svg]:size-full rounded-lg size-full text-(--tab-color) max-md:bg-(--tab-color)/10 max-md:border max-md:p-1.5"
            style={
              {
                '--tab-color': color,
              } as CSSProperties
            }
          >
            {node.icon}
          </div>
        ),
      };
    },
  });

  return (
    <EditorShell
      {...base}
      repository={repository()}
      tree={tree}
      tabs={tabs}
      // just icon items
      links={linkItems.filter((item) => item.type === 'icon')}
      nav={{
        ...base.nav,
        title: (
          <>
            {logo}
            <span className="font-medium in-[.uwu]:hidden max-md:hidden">Fumadocs</span>
          </>
        ),
      }}
    >
      {children}

      <AISearch>
        <AISearchPanel />
        <AISearchTrigger
          position="float"
          className={cn(
            buttonVariants({
              variant: 'secondary',
              className: 'text-fd-muted-foreground rounded-2xl',
            }),
          )}
        >
          <MessageCircleIcon className="size-4.5" />
          Ask AI
        </AISearchTrigger>
      </AISearch>
    </EditorShell>
  );
}
