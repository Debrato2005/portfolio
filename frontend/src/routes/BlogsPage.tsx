import { Link } from 'react-router';
import { Icon } from '../components/ui/Icon';
import { articles } from '../features/portfolio/content';
import { links } from '../lib/links';

export function BlogsPage() {
  return (
    <main id="main" className="page content-page writing-archive">
      <Link className="back-link" to="/#thoughts">
        Back to portfolio
      </Link>
      <p className="eyebrow">Notes across disciplines</p>
      <h1 tabIndex={-1}>Writing archive</h1>
      <p className="intro">
        Essays and working notes about software, research, and the ideas that
        connect them. Published pieces open at their original home.
      </p>
      <div className="content-list" aria-label="Published writing">
        {articles.map((article) => (
          <article key={article.slug}>
            <img
              className="article-cover"
              src={article.illustratedCover}
              width={768}
              height={512}
              alt="An illustrated sunlit desk with a camera and notebook"
              loading="lazy"
            />
            <div>
              <p className="publication-status">
                {article.date ?? 'Publication date not verified'}
              </p>
              <h2>{article.title}</h2>
              <p>
                A cross-disciplinary note on looking beyond the boundaries of
                one field for the next useful idea.
              </p>
            </div>
            <a href={article.href}>
              Read original <Icon name="arrow-up-right" />
            </a>
          </article>
        ))}
      </div>
      <p className="archive-source">
        More writing lives on <a href={links.blog}>Debrato’s Bear Blog</a>.
      </p>
    </main>
  );
}
