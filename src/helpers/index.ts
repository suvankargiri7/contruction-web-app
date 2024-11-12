export interface Inputdata {
  data: DataObject[];
}
export interface DataObject {
  code: string;
  title: string;
}
export interface TreeObject {
  code: string;
  title: string | undefined;
}
export interface Result {
    [key:string]: TreeObject[];
}
export const makeDataFormat =  (inputData: Inputdata) => {
  const dataObjects = inputData.data;
  let finalTree =  buildTree(dataObjects);
  return finalTree;
};

  export const buildTree = (data: DataObject[]) => {
    const tree: Result = {};

    // Initialize the root node (00 00 00)
    tree['00 00 00'] = [];

    // Sort the data by the 'code' field to maintain correct hierarchical order
    data.sort((a, b) => a.code.localeCompare(b.code));

    // Helper function to add nodes to the tree
    const addNode = (parentCode: string, node: TreeObject) => {
        //@ts-ignore
        if (!tree[parentCode]) {
            //@ts-ignore
            tree[parentCode] = [];  // Initialize the parent if not already
        }
        //@ts-ignore
        tree[parentCode].push(node);
    }

    // Iterate over the data to construct the tree  
    data.forEach(item => {
        const { code, title } = item;

        // Case 1: Root node is "00 00 00"
        if (code === "00 00 00") {
            //@ts-ignore
            tree["00 00 00"] = [{ code, title }];
        }
        // Case 2: Nodes like "XX 00 00" are direct children of "00 00 00"
        else if (code.match(/^\d{2} 00 00$/)) {
            addNode("00 00 00", { code, title });
        }
        // Case 3: Nodes like "00 XX 00" are direct children of "00 00 00"
        else if (code.match(/^00 \d{2} 00$/)) {
            addNode("00 00 00", { code, title });
        }
        // Case 4: Nodes like "00 00 XX" are direct children of "00 00 00"
        else if (code.match(/^00 00 \d{2}$/)) {
            addNode("00 00 00", { code, title });
        }
        // Case 5: Nodes like "00 XX XX" are children of "00 XX 00"
        else if (code.match(/^00 \d{2} \d{2}$/)) {
            const parentCode = code.slice(0, 5) + " 00";  // Example: "00 01 00"
            addNode(parentCode, { code, title });
        }
        // Case 6: Nodes like "XX XX 00" are children of "XX 00 00"
        else if (code.match(/^\d{2} \d{2} 00$/)) {
            const parentCode = code.slice(0, 2) + " 00 00";  // Example: "00 00 00"
            addNode(parentCode, { code, title });
        }
        // Case 7: Nodes like "XX 00 XX" are children of "XX 00 00"
        else if (code.match(/^\d{2} 00 \d{2}$/)) {
            const parentCode = code.slice(0, 5) + " 00";  // Example: "00 00 00"
            addNode(parentCode, { code, title });
        }
        // Case 8: Nodes like "XX XX XX" are children of "XX XX 00"
        else if (code.match(/^\d{2} \d{2} \d{2}$/)) {
            const parentCode = code.slice(0, 6)+ "00";  // Example: "00 00 00"
            addNode(parentCode, { code, title });
        }
        // Case 9: Nodes like "XX XX XX.XX" are children of "XX XX XX"
        else if (code.match(/^\d{2} \d{2} \d{2}\.\d{2}$/)) {
            const parentCode = code.slice(0, 8);  // Example: "00 00 00"
            addNode(parentCode, { code, title });
        }
    });

    return tree;
}

   

     