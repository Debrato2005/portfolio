import { links } from '../../lib/links';
import { Dialog } from '@base-ui/react/dialog';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { sections, projects, articles } from './content';
import { Icon } from '../../components/ui/Icon';
import { skies } from './Theme';
import type { Sky } from './Theme';
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
  href?: string;
  download?: string;
  action: () => void;
};

export function CommandPalette({
  chooseTheme,
  chooseSky,
}: {
  chooseTheme: (theme: 'light' | 'dark') => void;
  chooseSky: (sky: Sky) => void;
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
  const jumpTo = (id: string) => {
    navigate(`/#${id}`);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target?.classList.contains('project-card')) {
          const details = target.querySelector<HTMLDetailsElement>('details');
          if (details) details.open = true;
        }
        target?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches
            ? 'instant'
            : 'smooth',
        });
        target
          ?.querySelector<HTMLElement>('h2, h3')
          ?.focus({ preventScroll: true });
      });
    });
  };
  const commands: Command[] = [
    ...sections.map(([id, title]) => ({
      title,
      group: 'On this page' as const,
      icon: 'arrow-right' as const,
      action: () => jumpTo(id),
    })),
    ...[
      ['Writing archive', '/blogs'],
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
      action: () => jumpTo(`project-${project.slug}`),
    })),
    ...articles.map((article) => ({
      title: `Article: ${article.title}`,
      group: 'Writing' as const,
      icon: 'arrow-right' as const,
      keywords: 'blog thoughts',
      action: () => navigate('/blogs'),
    })),
    {
      title: 'Download resume',
      group: 'Connect',
      icon: 'arrow-up-right',
      keywords: 'cv experience',
      href: links.resume,
      download: 'Debrato-Ghosh-Resume.pdf',
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
      href: links.github,
      action: () => window.location.assign(links.github),
    },
    {
      title: 'LinkedIn profile',
      group: 'Connect',
      icon: 'linkedin-logo',
      href: links.linkedin,
      action: () => window.location.assign(links.linkedin),
    },
    {
      title: 'Email Debrato',
      group: 'Connect',
      icon: 'envelope-simple',
      keywords: 'mail contact',
      href: links.email,
      action: () => window.location.assign(links.email),
    },
    ...(['light', 'dark'] as const).map((theme) => ({
      title: `Theme: ${theme}`,
      group: 'Appearance' as const,
      icon: (theme === 'light' ? 'sun' : 'moon') as ComponentProps<
        typeof Icon
      >['name'],
      keywords: 'mode color scheme',
      action: () => chooseTheme(theme),
    })),
    ...skies.map((sky) => ({
      title: `Sky: ${sky.label}`,
      group: 'Appearance' as const,
      icon: 'palette' as const,
      keywords: 'color colour palette seed dynamic',
      action: () => chooseSky(sky.id),
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
        event.defaultPrevented ||
        event.isComposing ||
        event.altKey ||
        !(event.ctrlKey || event.metaKey) ||
        event.key.toLowerCase() !== 'k'
      )
        return;
      const target = event.target;
      if (
        !open &&
        target !== search.current &&
        target instanceof HTMLElement &&
        (target.isContentEditable || target.closest('input, textarea, select'))
      )
        return;
      event.preventDefault();
      if (!open) {
        pendingAction.current = null;
        invoker.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
      }
      setQuery('');
      setActive(0);
      setOpen((value) => !value);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  useLayoutEffect(() => {
    if (!open) return;
    const option = document.getElementById(`${listId}-${active}`);
    const list = document.getElementById(listId);
    if (!option || !list) return;
    const optionBounds = option.getBoundingClientRect();
    const listBounds = list.getBoundingClientRect();
    if (optionBounds.bottom > listBounds.bottom)
      list.scrollTop += optionBounds.bottom - listBounds.bottom + 4;
    else if (optionBounds.top < listBounds.top)
      list.scrollTop -= listBounds.top - optionBounds.top + 4;
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
          pendingAction.current = null;
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
        className="search-trigger ripple"
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
            <Dialog.Close className="quiet-button ripple command-close">
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
                  {items.map(({ command, index }) => {
                    const Item = command.href ? 'a' : 'div';
                    return (
                      <Item
                        role="option"
                        aria-label={command.title}
                        aria-description={
                          command.href?.startsWith('https:')
                            ? 'External website'
                            : undefined
                        }
                        aria-selected={active === index}
                        href={command.href}
                        download={command.download}
                        tabIndex={-1}
                        id={`${listId}-${index}`}
                        key={command.title}
                        onPointerMove={(event) => {
                          if (event.pointerType !== 'touch') setActive(index);
                        }}
                        onMouseDown={(event) => {
                          if (!command.href) event.preventDefault();
                        }}
                        onClick={() => {
                          if (!command.href) run(index);
                        }}
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
                      </Item>
                    );
                  })}
                </div>
              );
            })}
          </div>
          {!results.length && (
            <div className="command-empty">
              <p>No matching commands.</p>
              <span>
                Try a project name, “photography”, “aurora” or “dark mode”.
              </span>
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
