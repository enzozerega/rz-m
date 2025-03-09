import {useDocumentOperation} from 'sanity'
import speakingurl from 'speakingurl'

export function slugOnSave(originalPublishAction) {
  const BetterAction = (props) => {
    // use the hook to get access to the patch function with the current document
    const {patch} = useDocumentOperation(props.id, props.type)
    const patchSlug = (slugValue) => {
      patch.execute([{set: {slug: {current: slugValue, _type: 'slug'}}}])
    }
    const originalResult = originalPublishAction(props)
    return {
      ...originalResult,
      onHandle: async () => {
        if (
          !props.draft ||
          (props.type !== 'talk' && props.type !== 'member' && props.type !== 'page')
        ) {
          return originalResult.onHandle()
        }
        // check for a title and existing slug
        const input = props.draft.title || props.draft.name
        if (input && !props.published?.slug?.current) {
          // use the generator package used in sanity core with default values
          const generatedSlug = defaultSlugify(input)
          // double check we've got a slug and patch it in
          if (generatedSlug) {
            patchSlug(generatedSlug)
          }
        }
        // then delegate to original handler
        originalResult.onHandle()
      },
    }
  }
  return BetterAction
}

const defaultSlugify = (value) => {
  const slugifyOpts = {truncate: 200, symbols: false}
  return value ? speakingurl(value, slugifyOpts) : ''
}
