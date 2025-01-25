"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

const shortcuts = [
  {
    title: "Home",
    onSelect: () => "/",
    keywords: "home main landing",
  },
  {
    title: "Essays",
    onSelect: () => "/essays",
    keywords: "writing blog posts articles",
  },
  {
    title: "Projects",
    onSelect: () => "/projects",
    keywords: "work portfolio code",
  },
  {
    title: "Contact",
    onSelect: () => "/contact",
    keywords: "email message reach",
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
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="Type a command or search..." 
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {shortcuts.map((shortcut) => (
            <CommandItem
              key={shortcut.title}
              onSelect={() => {
                router.push(shortcut.onSelect())
                setOpen(false)
              }}
            >
              {shortcut.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
