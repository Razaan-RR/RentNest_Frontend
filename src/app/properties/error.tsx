'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div
      className="
      min-h-[400px]
      flex
      flex-col
      items-center
      justify-center
      gap-4
    "
    >
      <h2 className="text-2xl font-bold">Something went wrong</h2>

      <p className="text-muted-foreground">Unable to load properties.</p>

      <button
        onClick={reset}
        className="
          rounded-md
          bg-primary
          px-5
          py-2
          text-primary-foreground
        "
      >
        Try Again
      </button>
    </div>
  )
}
