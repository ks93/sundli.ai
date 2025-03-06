'use client';

import { Terminal } from './terminal';
import { essays, projects } from './terminal-data';

export function TerminalContentProvider() {
  return (
    <Terminal 
      initialCommand="ls" 
      essays={essays} 
      projects={projects} 
    />
  );
} 