import {ITreeItem} from "../../atoms/tree-item/tree-item.component";

export const TreeListMock: ITreeItem = {
  type: 'root',
  name: 'ROOOT',
  expanded: true,
  threeId: 0,
  parentId: null,
  items: [
    {
      threeId: 1,
      type: 'folder',
      expanded: true,
      name: 'Cartella 1',
      parentId: 0,
      items: [
        {
          threeId: 2,
          parentId: 1,
          type: 'folder',
          expanded: true,
          name: 'Cartella vuota',
          items: []
        },
        {
          threeId: 3,
          parentId: 1,
          type: 'file',
          name: 'Appunti di casa'
        },
        {
          type: 'file',
          name: 'Pluto',
          threeId: 4,
          parentId: 1
        },
        {
          type: 'folder',
          expanded: true,
          name: 'Cartellona',
          threeId: 5,
          parentId: 1,
          items: [
            {
              type: 'file',
              name: 'Appunti di depth',
              parentId: 5,
              threeId: 6
            }
          ]
        }
      ]
    }, {
      type: 'file',
      name: 'Appunti di base',
      parentId: 0,
      threeId: 7
    }
  ]
}
