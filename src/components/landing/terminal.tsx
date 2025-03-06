import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useVersionedNavigation } from '@/lib/navigation';
import { contactInfo } from './terminal-data';

type ContentItem = {
  slug: string;
  title: string;
  description: string;
  content: string;
};

type TerminalEntry = {
  command: string;
  output?: React.ReactNode;
};

type TerminalProps = {
  initialCommand?: string;
  essays?: ContentItem[];
  projects?: ContentItem[];
};

const styles = {
  terminal: "text-white font-mono p-8 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col",
  historyContainer: "flex-grow flex flex-col justify-end overflow-hidden",
  history: "space-y-2 overflow-hidden",
  prompt: "text-[#ff6b6b] font-bold whitespace-nowrap",
  path: "text-[#4ecdc4]",
  input: "bg-transparent border-none outline-none text-white font-mono w-full caret-transparent",
  inputWrapper: "flex items-center mt-2 overflow-hidden",
  clickable: "cursor-pointer text-[#ff6b6b] hover:underline",
  outputItem: "flex flex-wrap overflow-hidden",
  outputName: "text-[#ff6b6b] w-32 min-w-[8rem]",
  outputDescription: "text-[#4ecdc4] flex-1 overflow-hidden",
  lsButton: "ml-2 text-[#ff6b6b] cursor-pointer hover:text-[#ff8a8a]",
  essayContent: "mt-2 text-white whitespace-pre-wrap max-w-full overflow-hidden",
  cursor: "inline-block w-[1px] h-[1.2em] bg-white",
  commandLine: "flex whitespace-nowrap overflow-hidden"
};

export function Terminal({ initialCommand = "ls", essays = [], projects = [] }: TerminalProps) {
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { getVersionedUrl } = useVersionedNavigation();

  // Simulate initial command on mount
  useEffect(() => {
    if (initialCommand) {
      // Execute the initial command immediately
      handleCommand(initialCommand);
    }
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when clicking anywhere in the terminal
  useEffect(() => {
    const handleClickAnywhere = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleClickAnywhere);
    return () => document.removeEventListener('click', handleClickAnywhere);
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture if user is typing in another input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (e.target !== inputRef.current) {
          return;
        }
      }
      
      // Focus the input and let the default behavior handle the typing
      if (inputRef.current && e.key.length === 1) {
        inputRef.current.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update cursor position when input changes
  useEffect(() => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || currentInput.length);
    }
  }, [currentInput]);

  // Update cursor position on selection change
  useEffect(() => {
    const handleSelectionChange = () => {
      if (inputRef.current && document.activeElement === inputRef.current) {
        setCursorPosition(inputRef.current.selectionStart || currentInput.length);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, [currentInput]);

  const handleClickCommand = (cmd: string) => {
    // Set the input field to the command
    setCurrentInput(cmd);
    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Submit the command after a short delay to show the typing
    setTimeout(() => {
      handleCommand(cmd);
    }, 300);
  };

  const handleCommand = (cmd: string) => {
    const command = cmd.trim();
    
    // Add command to history
    const newEntry: TerminalEntry = { command };
    
    // Process command
    if (command === "ls") {
      newEntry.output = (
        <div className="flex flex-col space-y-2 mt-2 overflow-hidden">
          <div className={styles.outputItem}>
            <span 
              className={styles.clickable}
              onClick={() => handleClickCommand("essays")}
            >
              essays
            </span>
          </div>
          <div className={styles.outputItem}>
            <span 
              className={styles.clickable}
              onClick={() => handleClickCommand("projects")}
            >
              projects
            </span>
          </div>
          <div className={styles.outputItem}>
            <span 
              className={styles.clickable}
              onClick={() => handleClickCommand("who")}
            >
              who
            </span>
          </div>
        </div>
      );
    } else if (command === "essays") {
      newEntry.output = (
        <div className="flex flex-col space-y-2 mt-2 overflow-hidden">
          {essays.length > 0 ? (
            essays.map((essay) => (
              <div key={essay.slug} className={styles.outputItem}>
                <span className={styles.outputName}>
                  <span 
                    className={styles.clickable}
                    onClick={() => handleClickCommand(`cat essays/${essay.slug}`)}
                  >
                    {essay.slug}
                  </span>
                </span>
                <span className={styles.outputDescription}>{essay.description}</span>
              </div>
            ))
          ) : (
            <div>No essays found.</div>
          )}
        </div>
      );
    } else if (command === "projects") {
      newEntry.output = (
        <div className="flex flex-col space-y-2 mt-2 overflow-hidden">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.slug} className={styles.outputItem}>
                <span className={styles.outputName}>
                  <span 
                    className={styles.clickable}
                    onClick={() => handleClickCommand(`cat projects/${project.slug}`)}
                  >
                    {project.slug}
                  </span>
                </span>
                <span className={styles.outputDescription}>{project.description}</span>
              </div>
            ))
          ) : (
            <div>No projects found.</div>
          )}
        </div>
      );
    } else if (command === "who") {
      newEntry.output = (
        <div className="flex flex-col space-y-2 mt-2 overflow-hidden">
          {contactInfo.map((item, index) => (
            <div key={index} className={styles.outputItem}>
              <span className={styles.outputName}>{item.name}</span>
              <span className={styles.outputDescription}>{item.value}</span>
            </div>
          ))}
        </div>
      );
    } else if (command.startsWith("cat ")) {
      const path = command.substring(4);
      
      if (path.startsWith("essays/")) {
        const essaySlug = path.substring(7);
        const essay = essays.find(e => e.slug === essaySlug);
        
        if (essay) {
          newEntry.output = (
            <div className={styles.essayContent}>
              <div className="font-bold mb-2">{essay.title}</div>
              <pre className="whitespace-pre-wrap overflow-hidden w-full">{essay.content}</pre>
            </div>
          );
        } else {
          newEntry.output = <div className="text-red-500">Essay not found: {essaySlug}</div>;
        }
      } else if (path.startsWith("projects/")) {
        const projectSlug = path.substring(9);
        const project = projects.find(p => p.slug === projectSlug);
        
        if (project) {
          newEntry.output = (
            <div className={styles.essayContent}>
              <div className="font-bold mb-2">{project.title}</div>
              <pre className="whitespace-pre-wrap overflow-hidden w-full">{project.content}</pre>
            </div>
          );
        } else {
          newEntry.output = <div className="text-red-500">Project not found: {projectSlug}</div>;
        }
      } else {
        newEntry.output = <div className="text-red-500">File not found: {path}</div>;
      }
    } else if (command.startsWith("cd ")) {
      // Handle navigation to different pages
      const path = command.substring(3).trim();
      
      if (path === "essays" || path === "/essays") {
        router.push(getVersionedUrl('/essays'));
        return;
      } else if (path === "projects" || path === "/projects") {
        router.push(getVersionedUrl('/projects'));
        return;
      } else if (path === "who" || path === "/who") {
        router.push(getVersionedUrl('/contact'));
        return;
      } else {
        newEntry.output = <div className="text-red-500">Directory not found: {path}</div>;
      }
    } else if (command === "help") {
      newEntry.output = (
        <div className="flex flex-col space-y-2 mt-2 overflow-hidden">
          <div>Available commands:</div>
          <div>ls - List available sections</div>
          <div>cd [section] - Navigate to a section</div>
          <div>cat [path] - View content</div>
          <div>essays - List essays</div>
          <div>projects - List projects</div>
          <div>who - Contact information</div>
          <div>help - Show this help</div>
        </div>
      );
    } else if (command === "clear") {
      setHistory([]);
      setCurrentInput("");
      return;
    } else {
      newEntry.output = <div className="text-red-500">Command not found: {command}</div>;
    }
    
    // Add to history and scroll to bottom
    setHistory(prev => [...prev, newEntry]);
    setCurrentInput("");
    
    // Ensure scroll to bottom happens after state update
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      handleCommand(currentInput);
    }
  };

  const handleLsClick = () => {
    handleClickCommand("ls");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
    setCursorPosition(e.target.selectionStart || e.target.value.length);
  };

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Home' || e.key === 'End') {
      setCursorPosition(e.currentTarget.selectionStart || currentInput.length);
    }
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setCursorPosition(e.currentTarget.selectionStart || currentInput.length);
  };

  return (
    <div className={styles.terminal} ref={terminalRef}>
      <div className={styles.historyContainer}>
        <div className={styles.history}>
          {history.map((entry, index) => (
            <div key={index} className="mb-2 overflow-hidden">
              <div className={styles.commandLine}>
                <span className={styles.prompt}>/sundli/ai &gt;</span>
                <span className="ml-2 break-all">{entry.command}</span>
              </div>
              {entry.output}
            </div>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleInputSubmit} className={styles.inputWrapper}>
        <span className={styles.prompt}>/sundli/ai &gt;</span>
        <div className="relative ml-2 flex-grow flex items-center overflow-hidden">
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={currentInput}
            onChange={handleInputChange}
            onKeyUp={handleInputKeyUp}
            onClick={handleInputClick}
            autoFocus
          />
          <div 
            className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} ${styles.cursor}`}
            style={{ 
              position: 'absolute', 
              left: `${cursorPosition}ch`, 
              top: '50%', 
              transform: 'translateY(-50%)' 
            }}
            aria-hidden="true"
          />
        </div>
        <span 
          className={styles.lsButton}
          onClick={handleLsClick}
          aria-label="Run ls command"
        >
          ls
        </span>
      </form>
    </div>
  );
} 