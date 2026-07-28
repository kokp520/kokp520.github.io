import React, { useEffect, useRef } from 'react';
import { mountScrollWorld } from './scrub-engine.js';

export const ScrollWorldComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Reset container contents if re-mounted
    containerRef.current.innerHTML = '';

    mountScrollWorld(containerRef.current, {
      brand: { name: "ADI'S TOOLBOX", href: "#/" },
      cta: { label: "RETURN TO PC ◄", href: "#/" },
      diveScroll: 1.4,
      connScroll: 1.0,
      hint: "SCROLL TO EXPLORE",
      nav: true,
      atmosphere: true,
      sections: [
        {
          id: 'hub',
          label: '01. HUB',
          still: '/scroll-world/stills/still_hub.svg',
          accent: '#2CB67D',
          eyebrow: '★ SYSTEM TOOLBOX V1.0 ★',
          title: "ADI'S TOOLBOX",
          body: 'UTILITY INVENTORY & DEVELOPER TOOLS. Scroll to explore developer utilities built with 100% client-side privacy.',
          tags: ['Client-Side', 'Pixel Art', 'Developer Tools'],
        },
        {
          id: 'gif-to-zip',
          label: '02. GIF TO ZIP',
          still: '/scroll-world/stills/still_gif.svg',
          accent: '#FF8E3C',
          eyebrow: '[ONLINE TOOL]',
          title: 'GIF TO ZIP',
          body: 'Decompose GIF animations into PNG image sequences and package them into a downloadable ZIP archive.',
          tags: ['GIF Decompiler', 'PNG Sequence', 'ZIP Archive'],
          cta: {
            primary: { label: 'LAUNCH TOOL ►', href: '#/tools/gifToZip' },
          },
        },
        {
          id: 'json-formatter',
          label: '03. JSON FORMAT',
          still: '/scroll-world/stills/still_json.svg',
          accent: '#2CB67D',
          eyebrow: '[ONLINE TOOL]',
          title: 'JSON FORMATTER',
          body: 'Format and validate JSON strings. Fast client-side processing to safely beautify and verify your JSON data.',
          tags: ['Beautify', 'Validate', 'Client-Side'],
          cta: {
            primary: { label: 'LAUNCH TOOL ►', href: '#/tools/jsonFormatter' },
          },
        },
        {
          id: 'yaml-formatter',
          label: '04. YAML FORMAT',
          still: '/scroll-world/stills/still_yaml.svg',
          accent: '#7F5AF0',
          eyebrow: '[ONLINE TOOL]',
          title: 'YAML FORMATTER',
          body: 'Format, validate, repair, and convert YAML to JSON. Features VS Code floating find & replace widget.',
          tags: ['YAML Fixer', 'YAML to JSON', 'VS Code Editor'],
          cta: {
            primary: { label: 'LAUNCH TOOL ►', href: '#/tools/yamlFormatter' },
          },
        },
        {
          id: 'arcade-exit',
          label: '05. EXIT',
          still: '/scroll-world/stills/still_exit.svg',
          accent: '#FF8E3C',
          eyebrow: '★ SYSTEM READY ★',
          title: 'RETURN TO PC',
          body: 'Select a tool from the sticky menu above or click below to return to the main Retro PC terminal.',
          tags: ['RetroPC', 'Arcade Hub'],
          cta: {
            primary: { label: 'RETURN TO PC ◄', href: '#/' },
          },
        },
      ],
    });
  }, []);

  return <div ref={containerRef} id="scroll-world-container" style={{ width: '100%', minHeight: '100vh' }} />;
};
