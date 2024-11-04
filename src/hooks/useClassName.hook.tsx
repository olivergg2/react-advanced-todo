// false used to support 'value && "string"' pattern
type ClassNameLike = string | undefined | false

export default function useClassName(...classNames: ClassNameLike[]) {
  return classNames
    .filter(cn => typeof cn === 'string')
    .join(' ')
    .trim()
}
