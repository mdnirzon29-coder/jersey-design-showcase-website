export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-20 text-center">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-14 w-14 text-neutral-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 12 3l9 4.5M3 7.5v9L12 21m-9-4.5L12 21m0-13.5 9 4.5M12 21V12m9-4.5v9L12 21" />
      </svg>
      <p className="mt-4 text-base font-semibold text-neutral-500">{message}</p>
    </div>
  );
}
