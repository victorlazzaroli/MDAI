import {ITreeItem} from "../../atoms/tree-item/tree-item.component";

export function traverseTreeAndCall(tree: ITreeItem, callback: (tree: ITreeItem) => ITreeItem): ITreeItem  {
  if (!Array.isArray(tree.items) || tree.items.length === 0) {
    return callback(tree);
  }

  for (let item of tree.items) {
    if (Array.isArray(item.items) && item.items.length > 0) {
      item = traverseTreeAndCall(item, callback)
    }
    callback(item);
  }

  return tree;
}
