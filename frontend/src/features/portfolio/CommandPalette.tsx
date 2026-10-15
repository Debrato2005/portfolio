import { links } from '../../lib/links';
import { Dialog } from '@base-ui/react/dialog';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { sections, projects, articles } from './content';
import { Icon } from '../../components/ui/Icon';
import type { ComponentProps } from 'react';

const groups = [
  'On this page',
  'Explore',
  'Projects',
  'Writing',
  'Connect',
  'Appearance',
] as const;
type Command = {
  title: string;
  group: (typeof groups)[number];
  icon: ComponentProps<typeof Icon>['name'];
  keywords?: string;
  action: () => void;
};

export function CommandPalette({
  chooseTheme,
}: {
  chooseTheme: (theme: 'system' | 'light' | 'dark') => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const invoker = useRef<HTMLElement | null>(null);
  const pendingAction = useRef<(() => void) | null>(null);
  const listId = useId();
  const navigate = useNavigate();
  const shortcut = /Mac|iPhone|iPad/.test(navigator.platform)
    ? '⌘ K'
    : 'Ctrl K';
  const commands: Command[] = [
    ...sections.map(([id, title]) => ({
      title,
      group: 'On this page' as const,
      icon: 'arrow-right' as const,
      action: () => {
        navigate(`/#${id}`);
        // Re-selecting the current hash must still move focus after the dialog closes.
        requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
              .matches
              ? 'instant'
              : 'smooth',
          });
          document
            .getElementById(id)
            ?.querySelector<HTMLElement>('h2')
            ?.focus({ preventScroll: true });
        });
      },
    })),
    ...[
      ['Projects archive', '/projects'],
      ['Hackathons archive', '/hackathons'],
      ['Thoughts archive', '/thoughts'],
      ['Photography gallery', '/photography'],
    ].map(([title, path]) => ({
      title: title!,
      group: 'Explore' as const,
      icon: 'arrow-right' as const,
      action: () => navigate(path!),
    })),
    ...projects.map((project) => ({
      title: `Project: ${project.name}`,
      group: 'Projects' as const,
      icon: 'laptop' as const,
      keywords: `${project.category} ${project.tags.join(' ')}`,
      action: () => navigate(`/projects/${project.slug}`),
    })),
    ...articles.map((article) => ({
      title: `Article: ${article.title}`,
      group: 'Writing' as const,
      icon: 'arrow-right' as const,
      keywords: 'blog thoughts',
      action: () => navigate(`/thoughts/${article.slug}`),
    })),
    {
      title: 'Download resume',
      group: 'Connect',
      icon: 'arrow-up-right',
      keywords: 'cv experience',
      action: () => {
        const link = document.createElement('a');
        link.href = links.resume;
        link.download = 'Debrato-Ghosh-Resume.pdf';
        link.click();
      },
    },
    {
      title: 'GitHub profile',
      group: 'Connect',
      icon: 'github-logo',
      action: () => window.location.assign(links.github),
    },
    {
      title: 'LinkedIn profile',
      group: 'Connect',
      icon: 'linkedin-logo',
      action: () => window.location.assign(links.linkedin),
    },
    {
      title: 'Email Debrato',
      group: 'Connect',
      icon: 'envelope-simple',
      keywords: 'mail contact',
      action: () => window.location.assign(links.email),
    },
    ...(['light', 'dark', 'system'] as const).map((theme) => ({
      title: `Theme: ${theme}`,
      group: 'Appearance' as const,
      icon: (theme === 'light'
        ? 'sun'
        : theme === 'dark'
          ? 'moon'
          : 'desktop') as ComponentProps<typeof Icon>['name'],
      keywords: 'mode color scheme',
      action: () => chooseTheme(theme),
    })),
  ];
  const terms = query.toLowerCase().trim().split(/\s+/);
  const results = commands.filter((command) => {
    const searchable =
      `${command.title} ${command.group} ${command.keywords ?? ''}`.toLowerCase();
    return terms.every((term) => searchable.includes(term));
  });
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        event.isComposing ||
        !(event.ctrlKey || event.metaKey) ||
        event.key.toLowerCase() !== 'k'
      )
        return;
      event.preventDefault();
      if (!open)
        invoker.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
      setQuery('');
      setActive(0);
      setOpen((value) => !value);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  useLayoutEffect(() => {
    if (open)
      document
        .getElementById(`${listId}-${active}`)
        ?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }, [active, query, open, listId]);
  function run(index: number) {
    const command = results[index];
    if (!command) return;
    pendingAction.current = command.action;
    setOpen(false);
  }
  return (
    <Dialog.Root
      open={open}
      onOpenChangeComplete={(value) => {
        if (value || !pendingAction.current) return;
        const action = pendingAction.current;
        pendingAction.current = null;
        requestAnimationFrame(action);
      }}
      onOpenChange={(value) => {
        setOpen(value);
        if (value) {
          setQuery('');
          setActive(0);
        }
      }}
    >
      <Dialog.Trigger
        ref={trigger}
        onClick={() => {
          invoker.current = trigger.current;
        }}
        className="search-trigger"
        aria-label="Search portfolio"
      >
        <Icon name="magnifying-glass" />
        <span className="search-label">Search</span> <kbd>{shortcut}</kbd>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="command-backdrop" />
        <Dialog.Popup
          className="command-popup"
          initialFocus={search}
          finalFocus={() => invoker.current ?? trigger.current}
        >
          <div className="command-heading">
            <Dialog.Title className="command-title">
              Find your way.
            </Dialog.Title>
            <Dialog.Close className="quiet-button command-close">
              Close <kbd>Esc</kbd>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Search sections, projects, articles, profiles and themes. Use arrow
            keys and Enter.
          </Dialog.Description>
          <div className="command-search">
            <Icon name="magnifying-glass" />
            <input
              ref={search}
              role="combobox"
              aria-label="Search commands"
              aria-autocomplete="list"
              aria-expanded="true"
              aria-controls={listId}
              aria-activedescendant={
                results[active] ? `${listId}-${active}` : undefined
              }
              placeholder="Search anything…"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={(event) => {
                if (event.nativeEvent.isComposing) return;
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                  event.preventDefault();
                  setActive((index) =>
                    results.length
                      ? (index +
                          (event.key === 'ArrowDown' ? 1 : -1) +
                          results.length) %
                        results.length
                      : 0,
                  );
                }
                if (event.key === 'Enter') {
                  event.preventDefault();
                  run(active);
                }
              }}
            />
          </div>
          <div
            role="listbox"
            aria-label="Commands"
            id={listId}
            className="command-results"
          >
            {groups.map((group) => {
              const items = results
                .map((command, index) => ({ command, index }))
                .filter(({ command }) => command.group === group);
              if (!items.length) return null;
              const groupId = `${listId}-group-${groups.indexOf(group)}`;
              return (
                <div
                  role="group"
                  aria-labelledby={groupId}
                  className="command-group"
                  key={group}
                >
                  <div className="command-group-label" id={groupId}>
                    {group}
                  </div>
                  {items.map(({ command, index }) => (
                    <div
                      role="option"
                      aria-label={command.title}
                      aria-selected={active === index}
                      id={`${listId}-${index}`}
                      key={command.title}
                      onPointerMove={(event) => {
                        if (event.pointerType !== 'touch') setActive(index);
                      }}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => run(index)}
                    >
                      <Icon name={command.icon} />
                      <span>{command.title}</span>
                      <Icon
                        name={
                          command.group === 'Connect'
                            ? 'arrow-up-right'
                            : 'arrow-right'
                        }
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          {!results.length && (
            <div className="command-empty">
              <p>No matching commands.</p>
              <span>Try a project name, “photography”, or “dark mode”.</span>
            </div>
          )}
          <div className="command-footer">
            <p className="command-help" role="status">
              {results.length} commands
            </p>
            <p className="command-help">
              <kbd>↑ ↓</kbd> move <kbd>Enter</kbd> open
            </p>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
