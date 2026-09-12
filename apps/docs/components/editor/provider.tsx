'use client';

import {
  createMdxPreviewRenderer,
  defaultComponentHints,
  FumadocsEditorLayout,
  type EditorRenderPreview,
  type MdxComponentHint,
  type RepositorySession,
} from 'fumadocs-editor';
import { prettierFormatter } from 'fumadocs-editor/format';
import * as Twoslash from 'fumadocs-twoslash/ui';
import { Banner } from 'fumadocs-ui/components/banner';
import { Callout } from 'fumadocs-ui/components/callout';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import {
  Building,
  CpuIcon,
  DatabaseIcon,
  HomeIcon,
  LinkIcon,
  PanelLeftDashed,
  PanelsTopLeftIcon,
  Rocket,
  TerminalIcon,
} from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { story } from '../../content/docs/(framework)/integrations/story/client.story';
import { UrlBar } from '../../content/docs/ui/components/tabs.client';
import { WidthTrigger } from '../../content/docs/ui/theme.client';
import { Mermaid } from '@/components/mdx/mermaid';
import { getMDXComponents } from '@/components/mdx';
import { Wrapper } from '@/components/preview/wrapper';

function PreviewInstallation({ name }: { name: string }) {
  return (
    <div className="p-3 border rounded-xl bg-fd-card text-fd-card-foreground my-4! text-sm not-prose">
      <p className="font-medium">Install to your codebase</p>
      <p className="mt-1 mb-4 text-fd-muted-foreground">Easier customization & control.</p>
      <CodeBlock>
        <Pre>npx @fumadocs/cli@latest add {name}</Pre>
      </CodeBlock>
    </div>
  );
}

function PreviewCustomization() {
  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl border bg-fd-card text-fd-card-foreground not-prose">
      <p className="font-medium text-sm">Install via Fumadocs CLI</p>
      <p className="text-fd-muted-foreground text-sm">
        For advanced customization that supported options cannot suffice.
      </p>
      <CodeBlock>
        <Pre>npx @fumadocs/cli@latest customize</Pre>
      </CodeBlock>
    </div>
  );
}

function PreviewAgentInstructions() {
  return (
    <div className="p-3 border rounded-xl bg-fd-card text-fd-card-foreground my-4! text-sm not-prose">
      <p className="font-medium">Using an AI agent?</p>
      <p className="mt-1 text-fd-muted-foreground">
        Copy the setup instructions into your agent and it will follow the recommended setup.
      </p>
    </div>
  );
}

const renderPreview: EditorRenderPreview = createMdxPreviewRenderer({
  ...getMDXComponents(),
  ...Twoslash,
  Banner,
  TypeTable,
  Wrapper,
  Mermaid,
  Installation: PreviewInstallation,
  Customization: PreviewCustomization,
  AgentInstructions: PreviewAgentInstructions,
  blockquote: Callout,
  Building,
  CpuIcon,
  DatabaseIcon,
  HomeIcon,
  LinkIcon,
  PanelLeftDashed,
  PanelsTopLeftIcon,
  Rocket,
  TerminalIcon,
  WidthTrigger,
  UrlBar,
  story,
});

const componentHints: MdxComponentHint[] = [
  ...defaultComponentHints,
  {
    name: 'Mermaid',
    description: 'Mermaid diagram',
    snippet: '<Mermaid chart={`\ngraph TD;\n  A --> B;\n`} />',
  },
  {
    name: 'Wrapper',
    description: 'Highlighted container',
    snippet: '<Wrapper>\n  ${}\n</Wrapper>',
  },
  {
    name: 'Installation',
    description: 'Fumadocs CLI install block',
    snippet: '<Installation name="${1:component}" />',
  },
  {
    name: 'Customization',
    description: 'Fumadocs CLI customization block',
    snippet: '<Customization />',
  },
  {
    name: 'AgentInstructions',
    description: 'AI agent setup callout',
    snippet: '<AgentInstructions />',
  },
];

export function EditorShell({
  repository,
  children,
  ...props
}: Omit<
  ComponentProps<typeof FumadocsEditorLayout>,
  'repository' | 'renderPreview' | 'formatter' | 'media' | 'components' | 'mdxComponents'
> & {
  repository: RepositorySession;
  children: ReactNode;
}) {
  return (
    <FumadocsEditorLayout
      {...props}
      repository={repository}
      renderPreview={renderPreview}
      formatter={prettierFormatter}
      components={componentHints}
      media={{ publicFolders: ['', 'blog', 'docs', 'showcases', 'themes'] }}
    >
      {children}
    </FumadocsEditorLayout>
  );
}
