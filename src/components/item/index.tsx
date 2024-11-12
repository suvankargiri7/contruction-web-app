import React from "react";

const Item = (props: any) => {
  const headers: Array<string> = ["title", "qty", "cost"];
  const selectedDropdown = props.selectedDropdown;
  const dataset = props.dataset;
  return (
    <div className="flex">
      <table border={1} cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            selectedDropdown &&
            dataset[selectedDropdown].map((item: any, index: number) => 
                
                (<tr key={index}>
                <td>{item.title}</td>
                <td><input /></td>
                <td><input /></td>
                </tr>)
                
            )}
          {!dataset[selectedDropdown].length && (
            <tr>
              <td>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Item;
