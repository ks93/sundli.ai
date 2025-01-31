"use client"

import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'

const shortcuts = [
  {
    title: "Home",
    onSelect: () => "/",
    keywords: "home main landing",
    hotkey: "h"
  },
  {
    title: "Essays",
    onSelect: () => "/essays",
    keywords: "writing blog posts articles",
    hotkey: "e"
  },
  {
    title: "Projects",
    onSelect: () => "/projects",
    keywords: "work portfolio code",
    hotkey: "p"
  },
  {
    title: "Contact",
    onSelect: () => "/contact",
    keywords: "email message reach",
    hotkey: "c"
  },
]

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }

      shortcuts.forEach(shortcut => {
        if (e.key === shortcut.hotkey && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          router.push(shortcut.onSelect())
          setOpen(false)
        }
      })
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [router])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-[90vw] bg-background border border-border rounded-lg shadow-lg p-2 animate-fade-in">
          <Dialog.Title className="sr-only">Command Menu</Dialog.Title>
          <Command>
            <Command.Input 
              className="w-full bg-transparent border-none outline-none p-4 text-foreground placeholder:text-muted-foreground"
              placeholder="Type a command or search..." 
            />
            <Command.List className="mt-2 p-2">
              <Command.Empty className="p-4 text-sm text-muted-foreground">
                No results found.
              </Command.Empty>
              {shortcuts.map((shortcut) => (
                <Command.Item
                  key={shortcut.title}
                  onSelect={() => {
                    router.push(shortcut.onSelect())
                    setOpen(false)
                  }}
                  className="p-4 rounded-md text-sm text-foreground hover:bg-secondary cursor-pointer flex items-center justify-between"
                >
                  <span>{shortcut.title}</span>
                  <kbd className="ml-auto text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                    ⌘ {shortcut.hotkey.toUpperCase()}
                  </kbd>
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
} 
