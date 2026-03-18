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
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          position: 'relative',
        },
        children: [
          // Top border line
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '2px',
                background: '#111110',
              },
            },
          },

          // Top row
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 'auto',
              },
              children: [
                // Wordmark
                {
                  type: 'div',
                  props: {
                    style: {
                      fontFamily: '"Courier New", Courier, monospace',
                      fontSize: '13px',
                      letterSpacing: '0.06em',
                      color: '#a8a8a5',
                      textTransform: 'lowercase',
                      fontWeight: '400',
                    },
                    children: 'damilares-skills',
                  },
                },
                // Stats row
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      gap: '48px',
                      alignItems: 'flex-start',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: '3px',
                          },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '32px',
                                  fontWeight: '500',
                                  color: '#111110',
                                  letterSpacing: '-0.04em',
                                  lineHeight: '1',
                                },
                                children: '57',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontFamily: '"Courier New", Courier, monospace',
                                  fontSize: '10px',
                                  color: '#a8a8a5',
                                  letterSpacing: '0.1em',
                                  textTransform: 'uppercase',
                                },
                                children: 'skills',
                              },
                            },
                          ],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: '3px',
                          },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '32px',
                                  fontWeight: '500',
                                  color: '#111110',
                                  letterSpacing: '-0.04em',
                                  lineHeight: '1',
                                },
                                children: '8',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontFamily: '"Courier New", Courier, monospace',
                                  fontSize: '10px',
                                  color: '#a8a8a5',
                                  letterSpacing: '0.1em',
                                  textTransform: 'uppercase',
                                },
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

          // Center: headline block
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginTop: '80px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '108px',
                      fontWeight: '500',
                      letterSpacing: '-0.05em',
                      color: '#111110',
                      lineHeight: '0.9',
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
                      color: '#787874',
                      letterSpacing: '-0.01em',
                      lineHeight: '1.45',
                    },
                    children: 'Curated AI coding skills — design, Vue, animation, engineering,\naccessibility, and more. For Claude Code and every intelligent harness.',
                  },
                },
              ],
            },
          },

          // Bottom row
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginTop: 'auto',
                paddingTop: '48px',
                borderTop: '1px solid #e2e2e0',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontFamily: '"Courier New", Courier, monospace',
                      fontSize: '12px',
                      color: '#a8a8a5',
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
                      gap: '6px',
                    },
                    children: ['Claude Code', 'Codex', 'Cursor', 'Copilot'].map(p => ({
                      type: 'div',
                      props: {
                        style: {
                          padding: '5px 12px',
                          border: '1px solid #e2e2e0',
                          fontFamily: '"Courier New", Courier, monospace',
                          fontSize: '11px',
                          color: '#a8a8a5',
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
