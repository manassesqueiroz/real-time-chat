import { Skeleton } from "@/components/ui/skeleton"
 
export function SkeletonProfile() {
  return (
    <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-6 w-16" />
    </div>
  )
}