import {ITreeItem} from "../../atoms/tree-item/tree-item.component";

export const TreeListMock: ITreeItem = {
  type: 'root',
  name: 'ROOOT',
  expanded: true,
  items: [
    {
      type: 'folder',
      expanded: true,
      name: 'Cartella 1',
      items: [
        {
          type: 'folder',
          expanded: true,
          name: 'Cartella vuota',
          items: []
        },
        {
          type: 'file',
          name: 'Appunti di casa',
          id: '3212'
        },
        {
          type: 'file',
          name: 'Pluto',
          id: '32512'
        },
        {
          type: 'folder',
          expanded: true,
          name: 'Cartellona',
          items: [
            {
              type: 'file',
              name: 'Appunti di depth',
              id: '32312'
            }
          ]
        }
      ]
    }, {
      type: 'file',
      name: 'Appunti di base',
      id: '32312'
    }
  ]
}
