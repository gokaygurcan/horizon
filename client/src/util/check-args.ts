import ordinal from './ordinal'

export interface CheckArgsArgs {
  nullable?: boolean,
  minArgs?: number,
  maxArgs?: number,
}
// Validation helper
export function checkArgs(
  name: string,
  args: Array<any>,
  {
    nullable = false,
    minArgs = 1,
    maxArgs = 1
  }: CheckArgsArgs = {}) {
  if (minArgs === maxArgs && args.length !== minArgs) {
    const plural = minArgs === 1 ? '' : 's'
    throw new Error(`${name} must receive exactly ${minArgs} argument${plural}`)
  }
  if (args.length < minArgs) {
    const plural1 = minArgs === 1 ? '' : 's'
    throw new Error(
      `${name} must receive at least ${minArgs} argument${plural1}.`)
  }
  if (args.length > maxArgs) {
    const plural2 = maxArgs === 1 ? '' : 's'
    throw new Error(
      `${name} accepts at most ${maxArgs} argument${plural2}.`)
  }
  for (let i = 0; i < args.length; i++) {
    if (!nullable && args[i] === null) {
      const ordinality = maxArgs !== 1 ? ` ${ordinal(i + 1)}` : ''
      throw new Error(`The${ordinality} argument to ${name} must be non-null`)
    }
    if (args[i] === undefined) {
      throw new Error(
        `The ${ordinal(i + 1)} argument to ${name} must be defined`)
    }
  }
}