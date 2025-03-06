"use client"

import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'
import { useVersionedNavigation } from '@/lib/navigation'

const shortcuts = [
  {
    title: "Home",
    path: "/",
    keywords: "home main landing",
    hotkey: "h"
  },
  {
    title: "Essays",
    path: "/essays",
    keywords: "writing blog posts articles",
    hotkey: "e"
  },
  {
    title: "Projects",
    path: "/projects",
    keywords: "work portfolio code",
    hotkey: "p"
  },
  {
    title: "Contact",
    path: "/contact",
    keywords: "email message reach",
    hotkey: "c"
  },
]

const styles = {
  overlay: "fixed inset-0 bg-black/50 animate-fade-in",
  content: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-[90vw] bg-background border border-border rounded-lg shadow-lg p-2 animate-fade-in",
  input: "w-full bg-transparent border-none outline-none p-4 text-foreground placeholder:text-muted-foreground",
  empty: "p-4 text-sm text-muted-foreground",
  item: "p-4 rounded-md text-sm text-foreground hover:bg-secondary cursor-pointer flex items-center justify-between data-[selected=true]:bg-secondary",
  hotkey: "ml-auto text-xs text-muted-foreground bg-secondary px-2 py-1 rounded",
  srOnly: "sr-only"
}

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { getVersionedUrl } = useVersionedNavigation()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }

      // Handle keyboard shortcuts for navigation
      if (open) {
        shortcuts.forEach(shortcut => {
          if (e.key === shortcut.hotkey && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            runCommand(shortcut.path)
          }
        })
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open])

  const runCommand = (path: string) => {
    setOpen(false)
    router.push(getVersionedUrl(path))
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.srOnly}>Command Menu</Dialog.Title>
          <Command>
            <Command.Input className={styles.input} placeholder="Type a command or search..." />
            <Command.List>
              <Command.Empty className={styles.empty}>No results found.</Command.Empty>
              {shortcuts.map((shortcut) => (
                <Command.Item
                  key={shortcut.path}
                  onSelect={() => runCommand(shortcut.path)}
                  className={styles.item}
                >
                  <span>{shortcut.title}</span>
                  <kbd className={styles.hotkey}>⌘{shortcut.hotkey.toUpperCase()}</kbd>
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
} 
