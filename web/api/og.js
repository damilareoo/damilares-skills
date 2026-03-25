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
          background: '#f7f6f0',
          display: 'flex',
          flexDirection: 'column',
          padding: '64px 80px',
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
                top: '0', left: '0', right: '0',
                height: '1px',
                background: '#e2dfda',
              },
            },
          },

          // Header row
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontFamily: '"Courier New", monospace',
                      fontSize: '13px',
                      letterSpacing: '0.02em',
                      color: '#706d69',
                    },
                    children: 'damilares-skills',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      gap: '40px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: { fontSize: '32px', fontWeight: '400', color: '#121210', letterSpacing: '-0.04em', lineHeight: '1' },
                                children: '57',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: { fontFamily: '"Courier New", monospace', fontSize: '10px', color: '#a09c97', letterSpacing: '0.1em', textTransform: 'uppercase' },
                                children: 'skills',
                              },
                            },
                          ],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: { fontSize: '32px', fontWeight: '400', color: '#121210', letterSpacing: '-0.04em', lineHeight: '1' },
                                children: '9',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: { fontFamily: '"Courier New", monospace', fontSize: '10px', color: '#a09c97', letterSpacing: '0.1em', textTransform: 'uppercase' },
                                children: 'domains',
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

          // Hero headline — large italic serif
          {
            type: 'div',
            props: {
              style: {
                marginTop: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '108px',
                      fontWeight: '400',
                      fontStyle: 'italic',
                      letterSpacing: '-0.03em',
                      color: '#121210',
                      lineHeight: '0.9',
                      fontFamily: 'Georgia, serif',
                    },
                    children: 'Teach Claude\nCode a specialty.',
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
                alignItems: 'center',
                marginTop: '48px',
                paddingTop: '24px',
                borderTop: '1px solid #e2dfda',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontFamily: '"Courier New", monospace',
                      fontSize: '12px',
                      color: '#a09c97',
                      letterSpacing: '0.04em',
                    },
                    children: 'damilares-skills.vercel.app',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', gap: '8px' },
                    children: ['Claude Code', 'Cursor', 'Copilot', 'Codex'].map(p => ({
                      type: 'div',
                      props: {
                        style: {
                          padding: '5px 14px',
                          border: '1px solid #e2dfda',
                          background: '#ece9e2',
                          fontFamily: '"Courier New", monospace',
                          fontSize: '11px',
                          color: '#706d69',
                          letterSpacing: '0.02em',
                          borderRadius: '100px',
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
