
export function setMinutesOfCurrentTime(num: number): Date {
  let d1 = new Date(),
    d2 = new Date(d1);
  d2.setMinutes(d1.getMinutes() + num);
  return d2;
}
