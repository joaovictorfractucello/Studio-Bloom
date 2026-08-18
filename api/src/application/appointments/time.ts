export function timeToMinutes(hhmm: string): number {
    const [h, m] = hhmm.split(":").map(Number)
    return h * 60 + m
  }
  
  export function combineDateAndTime(date: Date, hhmm: string): Date {
    const result = new Date(date)
    const [h, m] = hhmm.split(":").map(Number)
    result.setHours(h, m, 0, 0)
    return result
  }
  
  export function intervalsOverlap(
    startA: Date,
    endA: Date,
    startB: Date,
    endB: Date
  ): boolean {
    return startA < endB && startB < endA
  }