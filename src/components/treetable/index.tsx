import React, { useState } from 'react';

// Sample data with a hierarchical structure
const treeData = [
  {
    id: 1,
    name: "Parent 1",
    children: [
      {
        id: 2,
        name: "Child 1-1",
        children: [
          { id: 3, name: "Grandchild 1-1-1" },
          { id: 4, name: "Grandchild 1-1-2" },
        ],
      },
      { id: 5, name: "Child 1-2" },
    ],
  },
  {
    id: 6,
    name: "Parent 2",
    children: [
      { id: 7, name: "Child 2-1" },
      { id: 8, name: "Child 2-2" },
    ],
  },
];

// Main TreeTable Component
//@ts-ignore
const TreeTable = (props)  => {
  const [expandedRows, setExpandedRows] = useState([]);

  // Toggle row expansion
  const toggleRow = (id: any) => {
    setExpandedRows((prevExpandedRows: any) =>
      prevExpandedRows.includes(id)
        ? prevExpandedRows.filter((rowId: any) => rowId !== id) // collapse if already expanded
        : [...prevExpandedRows, id] // expand if not already expanded
    );
  };

  
  // Helper function to create hierarchical structure
  //@ts-ignore
  function transformData(data, selectedValue) {
    //@ts-ignore
    const result = [];
    let idCounter = 1;
    //let shiftedData = data['00 00 00'].shift();
    console.log(data);
    //console.log(data['00 00 00']);
    for (const parentCode in data[selectedValue]) {
      // Create a parent object with unique id and name
      console.log('pcode-->>', data[selectedValue][parentCode].code);
      //let pcode = data[parentCode].code;
      const parent = {
        id: idCounter++,
        code: data[selectedValue][parentCode].code,
        name: data[selectedValue][parentCode].title,
        children: [],
      };
  
      // Loop through each child item for the current parent
       console.log('pCHILD-->>', data[data[selectedValue][parentCode].code]);
       if(data[data[selectedValue][parentCode].code] && data[data[selectedValue][parentCode].code].length > 0) {
        //@ts-ignore
        
        data[data[selectedValue][parentCode].code].forEach((item, index) => {
            if (index === 0) return; // Skip the first item (already used as parent name)
            const child = {
             id: idCounter++,
             code: item.code,
              name: item.title,
            };
            console.log('child', child);
             //@ts-ignore
            parent.children.push(child);
          });
       }
      
  
      result.push(parent);
      console.log('final parent -->>',parent);
    }
  //@ts-ignore
  //console.log(result);
    return result;
  }
  
  const transformedData = transformData(props.data, props.selectedDropdown);
  console.log(transformedData);
  
  // Recursive Row Component
  const renderRow = (node: any, level = 0) => {
    //@ts-ignore
    const isExpanded = expandedRows.includes(node.id);

    return (
      <React.Fragment key={node.id}>
        <tr>
        <td>
            {node.children && node.children.length > 0 && (
              <button onClick={() => toggleRow(node.id)}>
                {isExpanded ? '-' : '+'}
              </button>
            )}
            {node.code}
        </td>
          <td style={{ paddingLeft: `${level * 20}px` }}>
            {node.name}
          </td>
          <td>
            {
                !node.children && (
                    <input />
                )
            }
          </td>
          <td>
            {
                !node.children && (
                    <input />
                )
            }
          </td>
        </tr>
        {isExpanded && node.children && node.children.map((child: any) => renderRow(child, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <table border={1} cellPadding="5" cellSpacing="0">
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Qty</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>{transformedData.map((node) => renderRow(node))}</tbody>
    </table>
  );
}

export default TreeTable;
