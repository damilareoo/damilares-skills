import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export function GET() {
  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          background: '#0d0d0b',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 96px',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          position: 'relative',
        },
        children: [
          // top row: wordmark + count
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontFamily: '"Courier New", Courier, monospace',
                      fontSize: '14px',
                      letterSpacing: '0.1em',
                      color: '#666660',
                      textTransform: 'lowercase',
                    },
                    children: 'damilares-skills',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      gap: '32px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: { fontSize: '28px', fontWeight: '500', color: '#e8e4de', letterSpacing: '-0.03em', lineHeight: '1' },
                                children: '57',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: { fontFamily: '"Courier New", Courier, monospace', fontSize: '10px', color: '#444440', letterSpacing: '0.08em', marginTop: '4px' },
                                children: 'SKILLS',
                              },
                            },
                          ],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: { fontSize: '28px', fontWeight: '500', color: '#e8e4de', letterSpacing: '-0.03em', lineHeight: '1' },
                                children: '8',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: { fontFamily: '"Courier New", Courier, monospace', fontSize: '10px', color: '#444440', letterSpacing: '0.08em', marginTop: '4px' },
                                children: 'CATEGORIES',
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },

          // center: the big title
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '100px',
                      fontWeight: '500',
                      letterSpacing: '-0.045em',
                      color: '#f0ece4',
                      lineHeight: '0.95',
                    },
                    children: 'The Arsenal',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '20px',
                      fontWeight: '400',
                      color: '#5a5a56',
                      letterSpacing: '-0.01em',
                      lineHeight: '1.5',
                    },
                    children: 'Curated AI coding skills — design, Vue, animation,\nengineering, accessibility, and more.',
                  },
                },
              ],
            },
          },

          // bottom: url + platform tags
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontFamily: '"Courier New", Courier, monospace',
                      fontSize: '13px',
                      color: '#444440',
                      letterSpacing: '0.04em',
                    },
                    children: 'damilares-skills.vercel.app',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      gap: '8px',
                    },
                    children: ['Claude Code', 'Codex', 'Cursor', 'Copilot'].map(p => ({
                      type: 'div',
                      props: {
                        style: {
                          padding: '5px 12px',
                          border: '1px solid #282826',
                          fontFamily: '"Courier New", Courier, monospace',
                          fontSize: '11px',
                          color: '#484844',
                          letterSpacing: '0.04em',
                        },
                        children: p,
                      },
                    })),
                  },
                },
              ],
            },
          },
        ],
      },
    },
    { width: 1200, height: 630 }
  );
}
