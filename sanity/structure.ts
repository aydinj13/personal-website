// sanity/structure.ts
import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Personal Website - Aydin Joshi')
    .items([
      S.documentTypeListItem('post').title('Post'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'author', 'category'].includes(item.getId()!),
      ),
    ])