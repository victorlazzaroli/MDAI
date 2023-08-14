import {ITreeItem} from "../../atoms/tree-item/tree-item.component";

export function mapPostTree(tree: ITreeItem, callback: (tree: ITreeItem) => ITreeItem): ITreeItem  {
  if (!tree || !callback || (typeof callback !== "function")) {
    throw new Error('Invalid arguments');
  }

  if (!Array.isArray(tree.items) || tree.items.length === 0) {
    return callback(tree);
  }

  for (let item of tree.items) {
    item = mapPostTree(item, callback)
  }
  return callback(tree);
}

export function mapPreTree(tree: ITreeItem, callback: (tree: ITreeItem) => ITreeItem): ITreeItem  {
  if (!tree || !callback || (typeof callback !== "function")) {
    throw new Error('Invalid arguments');
  }

  if (!Array.isArray(tree.items) || tree.items.length === 0) {
    return callback(tree);
  }

  tree = callback(tree);
  if (!Array.isArray(tree.items)) return tree;

  for (let item of tree.items) {
    item = mapPreTree(item, callback)
  }

  return tree;
}

export function findTreeItem(comparator: (element: ITreeItem) => boolean, tree: ITreeItem): ITreeItem | null {

  if (comparator(tree)) {
    return tree
  }

  if (!tree?.items) {
    return null;
  }

  for (let element of tree.items) {
    const found = findTreeItem(comparator, element);
    if (found) {
      return found;
    }
  }

  return null;
}

export function appendTreeItem(tree: ITreeItem, item: ITreeItem): ITreeItem {
  if (!tree) {
    throw new Error("tree parameter can't be null");
  }

  if (!item?.parentId) {
    throw new Error("Invalid item element");
  }

  const parentElement = findTreeItem((tree) =>  tree.id === item.parentId, tree);
  if (parentElement && parentElement.type !== 'file') {
     parentElement.items = Array.isArray(parentElement.items) ? parentElement.items.concat(item) : [item];
  }


  return tree;
}

export function pruneTreeItem(tree: ITreeItem, id: string): ITreeItem | null {
  if (!tree) {
    throw new Error("tree parameter can't be null");
  }

  if (!id) {
    throw new Error("parentId parameter can't be null");
  }

  let foundIndex: number = -1;

  const parentElement = findTreeItem((tree) =>  {

    if (!tree?.items) {
      return false;
    }

    let index = 0;
    for (let item of tree.items) {
      if(item.id === id) {
        foundIndex = index;
        return true;
      }
      index = index + 1;
    }
    return false;
  }, tree);

  if (parentElement) {
    return parentElement.items!.splice(foundIndex, 1)[0];
  }

  return null;

}

export function showTree(tree: ITreeItem) {
  mapPreTree(tree, (item: ITreeItem) => {
    console.log(item?.name)
    return item;
  });
}

export function deepCopySerializableTree(tree: ITreeItem): ITreeItem {
  if (!tree) {
    throw new Error("tree parameter can't be null");
  }
  return JSON.parse(JSON.stringify(tree));
}
