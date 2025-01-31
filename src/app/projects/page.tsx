'use client';

import { PageContainer } from '@/components/layout/page-container';
import { ProjectCard } from '@/components/projects/project-card';
import { Badge } from '@/components/ui/badge';
import { getAllProjects, getAllTags, type Project } from '@/content/projects';
import { useState } from 'react';

export default function Projects() {
  const projects = getAllProjects();
  const allTags = getAllTags();
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      const newTags = new Set(prev);
      if (newTags.has(tag)) {
        newTags.delete(tag);
      } else {
        newTags.add(tag);
      }
      return newTags;
    });
  };

  const filteredProjects = selectedTags.size > 0
    ? projects.filter((project: Project) => 
        project.tags.some(tag => selectedTags.has(tag))
      )
    : projects;

  return (
    <PageContainer 
      title="Projects"
      description="A collection of my personal and professional projects"
    >
      <div className="space-y-8">
        {/* Tags filter */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag: string) => (
            <Badge 
              key={tag}
              variant={selectedTags.has(tag) ? "default" : "outline"}
              className="cursor-pointer hover:bg-secondary"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: Project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <p className="text-center text-muted-foreground">
            No projects found with the selected tags.
          </p>
        )}
      </div>
    </PageContainer>
  );
} 