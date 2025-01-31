import { Project } from '@/content/projects';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Github, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const statusColors = {
  'completed': 'bg-green-500/10 text-green-500',
  'in-progress': 'bg-yellow-500/10 text-yellow-500',
  'planned': 'bg-blue-500/10 text-blue-500',
} as const;

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg">{project.title}</h3>
            <Badge 
              variant="secondary" 
              className={cn(
                "mt-2",
                statusColors[project.status]
              )}
            >
              {project.status}
            </Badge>
          </div>
          <div className="flex gap-2">
            {project.github && (
              <Link 
                href={project.github}
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
            )}
            {project.link && (
              <Link 
                href={project.link}
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <LinkIcon className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{project.description}</p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
} 