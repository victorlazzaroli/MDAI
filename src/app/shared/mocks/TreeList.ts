import {ITreeItem} from "../../atoms/tree-item/tree-item.component";

export const TreeListMock: ITreeItem = {
  type: 'root',
  name: 'ROOOT',
  expanded: true,
  id: '0',
  parentId: null,
  items: [
    {
      id: '1',
      type: 'folder',
      expanded: true,
      name: 'Cartella 1',
      parentId: '0',
      items: [
        {
          id:'2',
          parentId: '1',
          type: 'folder',
          expanded: true,
          name: 'Cartella vuota',
          items: []
        },
        {
          id:'3',
          parentId: '1',
          type: 'file',
          name: 'Appunti di casa'
        },
        {
          type: 'file',
          name: 'Pluto',
          id:'4',
          parentId: '1'
        },
        {
          type: 'folder',
          expanded: true,
          name: 'Cartellona',
          id:'5',
          parentId: '1',
          items: [
            {
              type: 'file',
              name: 'Appunti di depth',
              parentId: '5',
              id: '6'
            }
          ]
        }
      ]
    }, {
      type: 'file',
      name: 'Appunti di base',
      parentId: '0',
      id: '7'
    }
  ]
}
