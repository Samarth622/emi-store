export default function Loading() {
  return (
    <div className="p-8 grid md:grid-cols-2 gap-10">
      <div className="h-80 bg-gray-200 animate-pulse rounded-xl" />
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-1/2" />
        <div className="h-10 bg-gray-200 animate-pulse rounded" />
        <div className="h-10 bg-gray-200 animate-pulse rounded" />
        <div className="h-10 bg-gray-200 animate-pulse rounded" />
      </div>
    </div>
  )
}