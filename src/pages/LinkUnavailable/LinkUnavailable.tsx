import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Footer } from '../../components';

const MESSAGES: Record<string, string> = {
  expired: 'This link has expired and is no longer active.',
  not_yet_active: 'This link is not active yet. Please check back later.',
};

const LinkUnavailable: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get('reason') ?? '';

  return (
    <section className="h-full bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md text-center px-6">
          <h1 className="text-3xl font-bold mb-4 text-primary">Link unavailable</h1>
          <p className="text-neutral-600 mb-8">{MESSAGES[reason] ?? 'This link is currently unavailable.'}</p>
          <Link to="/">
            <Button>Go to Scissor</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default LinkUnavailable;
