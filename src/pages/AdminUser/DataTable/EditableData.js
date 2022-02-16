import React from "react";

const EditableData = ({ data }) => {
  const styles = {
    backgroundColor: "#EEEEEE",
    border: "none",
    height: "30px",
  };
  return (
    <tr>
      <td>
        <input
          required
          placeholder="Enter the name..."
          type="text"
          style={styles}
        />
      </td>
      <td>
        <input
          required
          placeholder="Enter the position..."
          type="text"
          style={styles}
        />
      </td>
      <td>
        <input
          required
          placeholder="Enter the office..."
          type="text"
          style={styles}
        />
      </td>
      <td>
        <input
          required
          placeholder="Enter the age..."
          type="text"
          style={styles}
        />
      </td>
      <td>
        <input
          required
          placeholder="Enter the start date..."
          type="text"
          style={styles}
        />
      </td>
      <td>
        <input
          required
          placeholder="Enter the salary..."
          type="text"
          style={styles}
        />
      </td>
      <td>
        <input
          required
          placeholder="Enter the name..."
          type="text"
          style={styles}
        />
      </td>
      <td>
        <input
          required
          placeholder="Enter the position..."
          type="text"
          style={styles}
        />
      </td>
      <td>
        <input
          required
          placeholder="Enter the office..."
          type="text"
          style={styles}
        />
      </td>
      <td>
        <input
          required
          placeholder="Enter the age..."
          type="text"
          style={styles}
        />
      </td>
      <td>
        <input
          required
          placeholder="Enter the start date..."
          type="text"
          style={styles}
        />
      </td>
    </tr>
  );
};

export default EditableData;
