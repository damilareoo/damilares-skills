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
          background: '#0c0c0a',
          display: 'flex',
          flexDirection: 'column',
          padding: '64px 80px',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          position: 'relative',
        },
        children: [
          // Top rule
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '0', left: '0', right: '0',
                height: '2px',
                background: '#dedad2',
              },
            },
          },

          // Top row: wordmark + stats
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              },
              children: [
                // Wordmark
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            width: '32px', height: '32px',
                            border: '1px solid #383835',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: '"Courier New", monospace',
                            fontSize: '14px',
                            color: '#7a7a75',
                          },
                          children: 'v',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontFamily: '"Courier New", monospace',
                            fontSize: '13px',
                            letterSpacing: '0.05em',
                            color: '#565652',
                          },
                          children: 'damilares-skills',
                        },
                      },
                    ],
                  },
                },
                // Stats
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      gap: '48px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: { fontSize: '36px', fontWeight: '500', color: '#f0ece4', letterSpacing: '-0.04em', lineHeight: '1' },
                                children: '57',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: { fontFamily: '"Courier New", monospace', fontSize: '10px', color: '#565652', letterSpacing: '0.1em', textTransform: 'uppercase' },
                                children: 'skills',
                              },
                            },
                          ],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: { fontSize: '36px', fontWeight: '500', color: '#f0ece4', letterSpacing: '-0.04em', lineHeight: '1' },
                                children: '8',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: { fontFamily: '"Courier New", monospace', fontSize: '10px', color: '#565652', letterSpacing: '0.1em', textTransform: 'uppercase' },
                                children: 'categories',
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

          // Hero headline
          {
            type: 'div',
            props: {
              style: {
                marginTop: '72px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '120px',
                      fontWeight: '400',
                      fontStyle: 'italic',
                      letterSpacing: '-0.035em',
                      color: '#f0ece4',
                      lineHeight: '0.88',
                      fontFamily: 'Georgia, serif',
                    },
                    children: 'Expert Modes',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '20px',
                      fontWeight: '400',
                      color: '#7a7a75',
                      letterSpacing: '-0.01em',
                      lineHeight: '1.5',
                    },
                    children: 'Turn your AI coding assistant into a specialist.\nWorks across Claude Code, Codex, Cursor, and Copilot.',
                  },
                },
              ],
            },
          },

          // Bottom bar
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginTop: 'auto',
                paddingTop: '40px',
                borderTop: '1px solid #1f1f1d',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontFamily: '"Courier New", monospace',
                      fontSize: '13px',
                      color: '#383835',
                      letterSpacing: '0.04em',
                    },
                    children: 'damilares-skills.vercel.app',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', gap: '6px' },
                    children: ['Claude Code', 'Codex', 'Cursor', 'Copilot'].map(p => ({
                      type: 'div',
                      props: {
                        style: {
                          padding: '5px 12px',
                          border: '1px solid #1f1f1d',
                          fontFamily: '"Courier New", monospace',
                          fontSize: '11px',
                          color: '#383835',
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
