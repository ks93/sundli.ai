'use client';

import { Terminal } from '../terminal';
import { essays, projects } from '../terminal-data';

const styles = {
  container: "h-screen w-screen flex flex-col relative bg-black overflow-hidden",
  terminalContainer: "w-full h-full overflow-hidden",
  footer: "absolute bottom-4 w-full text-center text-sm text-white opacity-50"
}

export function Dev25Landing() {
  const currentYear = new Date().getFullYear();

  return (
    <main className={styles.container}>
      <div className={styles.terminalContainer}>
        <Terminal initialCommand="ls" essays={essays} projects={projects} />
      </div>
      
      <div className={styles.footer}>
        <p>© {currentYear} Kelvin Sundli</p>
      </div>
    </main>
  );
} 