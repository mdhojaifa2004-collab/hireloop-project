/**
 * One labelled filter control.
 *
 * The filters all share the same label + field layout, so this small wrapper
 * keeps that markup in one place instead of repeating it five times.
 */
export function FilterField({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string
  /** Id of the control the label belongs to. */
  htmlFor: string
  /** Extra grid classes, e.g. to span two columns. */
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="font-label text-[11px] font-medium tracking-[0.08em] text-white/50 uppercase"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  )
}
