import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={cn("animate-pulse bg-muted/50 rounded-md", className)} />
}

