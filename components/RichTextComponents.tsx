/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import Image from 'next/image';
import Link from 'next/link';
import { Tweet } from 'react-tweet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import urlForImage from '@/sanity/lib/urlForImage';
export const RichTextComponents = {
  types: {
    table: ({ value }: any) => {
      console.log('Table value:', value);
      const { rows } = value;
      if (!rows) return null;
      return (
        <div className='mx-22 my-4 rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                {rows[0]?.cells.map((cell: string, i: number) => (
                  <TableHead
                    key={i}
                    className='text-bold whitespace-nowrap bg-gray-200 px-4 py-2 font-semibold text-black dark:bg-gray-800 dark:text-white'
                  >
                    {cell}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.slice(1).map((row: any, i: number) => (
                <TableRow key={i}>
                  {row.cells.map((cell: string, j: number) => (
                    <TableCell key={j} className='px-4 py-2'>
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
    },
    image: ({ value }: any) => {
      const alt = value.alt;
      return (
        <div className='space-y-2 lg:my-2'>
          <div className='relative h-96 w-full rounded-lg border border-light-400/70'>
            <Image className='object-cover' src={urlForImage(value)?.url() || ''} alt={alt} fill />
          </div>
          <div className='flex justify-center'>
            <p className='rounded-lg border border-gray-400 bg-gray-100 px-3 py-0.5 text-xs font-light text-gray-600 dark:bg-gray-800 dark:text-gray-300'>
              {alt}
            </p>
          </div>
        </div>
      );
    },
    youtubeEmbed: ({ value }: any) => {
      const videoId = value.videoId;
      return (
        <div className='mx-auto my-6 flex max-w-full items-center justify-center'>
          <iframe
            width='640'
            height='360'
            src={`https://www.youtube.com/embed/${videoId}`}
            title='YouTube Video Embed'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      );
    },
    twitterEmbed: ({ value }: any) => {
      const tweetId = value.tweetId;
      return (
        <div className='mx-auto my-6 flex max-w-full justify-center'>
          <Tweet id={tweetId} />
        </div>
      );
    },
    instagramEmbed: ({ value }: any) => {
      const postId = value.postId;
      return (
        <div className='mx-auto my-6 flex max-w-full justify-center'>
          <blockquote
            className='instagram-media min-w-fit max-w-lg'
            data-instgrm-captioned
            data-instgrm-permalink={`https://www.instagram.com/p/${postId}`}
            data-instgrm-version='14'
          >
            <div>
              <Link
                href={`https://www.instagram.com/p/${postId}`}
                className='hover:sky-600 text-untele'
                target='_blank'
              >
                View this post on Instagram
              </Link>
            </div>
          </blockquote>
          <script async src='//www.instagram.com/embed.js' />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className='ml-8 list-disc space-y-2 py-2'>{children}</ul>,
    number: ({ children }: any) => (
      <ol className='ml-8 list-decimal space-y-2 py-2'>{children}</ol>
    ),
  },
  block: {
    p: ({ children }: any) => <p className='my-2 text-sm'>{children}</p>,
    normal: ({ children }: any) => <p className='my-3 text-sm'>{children}</p>,
    h1: ({ children }: any) => <h1 className='py-4 text-3xl font-bold md:text-4xl'>{children}</h1>,
    h2: ({ children }: any) => <h2 className='py-4 text-2xl font-bold md:text-3xl'>{children}</h2>,
    h3: ({ children }: any) => <h3 className='py-4 text-xl font-bold md:text-2xl'>{children}</h3>,
    h4: ({ children }: any) => <h4 className='py-4 text-lg font-bold md:text-xl'>{children}</h4>,
    bullet: ({ children }: any) => <ul className=''>{children}</ul>,
    number: ({ children }: any) => <ol className=''>{children}</ol>,
    break: () => <br />,
    blockquote: ({ children }: any) => (
      <blockquote className='my-4 border-l-4 border-l-slate-600 py-2 pl-4'>
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          className='px-0.5 text-accent1-400 underline decoration-accent2-400 hover:text-accent2-400'
        >
          {children}
        </Link>
      );
    },
    quote: ({ children }: any) => (
      <blockquote className='my-4 border-l-4 border-l-accent1-600 py-4 pl-4'>
        {children}
      </blockquote>
    ),
    em: ({ children }: any) => <em className='italic'>{children}</em>,
    strong: ({ children }: any) => <strong>{children}</strong>,
    underline: ({ children }: any) => <u>{children}</u>,
    strikethrough: ({ children }: any) => <s>{children}</s>,
    superscript: ({ children }: any) => <sup>{children}</sup>,
    subscript: ({ children }: any) => <sub>{children}</sub>,
  },
};