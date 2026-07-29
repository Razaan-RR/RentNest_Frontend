export default function PropertyCardSkeleton() {
  return (
    <div className="rounded-xl border p-5 shadow-sm animate-pulse">
      <div className="h-48 rounded-lg bg-muted" />

      <div className="mt-4 space-y-3">
        <div className="h-6 w-3/4 rounded bg-muted" />

        <div className="h-4 w-1/2 rounded bg-muted" />

        <div className="h-6 w-1/3 rounded bg-muted" />

        <div className="flex gap-3">
          <div className="h-4 w-16 rounded bg-muted" />

          <div className="h-4 w-16 rounded bg-muted" />

          <div className="h-4 w-16 rounded bg-muted" />
        </div>
      </div>
    </div>
  )
}
