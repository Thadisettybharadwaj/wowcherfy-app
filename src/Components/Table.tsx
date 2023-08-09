import React, { Fragment } from "react";
import { ProductType } from "../Types";

type TableComponentProps = {
  tableData: ProductType;
  revenue: number;
};

const Table: React.FC<TableComponentProps> = (props) => {
  const { tableData, revenue } = props;
  console.log(tableData.length, revenue);
  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <td>Product Name</td>
            <td>Total Revenue From Sales</td>
          </tr>
        </thead>
        {tableData?.map((info, id) => {
          return (
            <tbody key={id}>
              <tr>
                <td>{info.name}</td>
                <td>{info.sold}</td>
              </tr>
            </tbody>
          );
        })}
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{revenue}</td>
          </tr>
        </tfoot>
      </table>
    </Fragment>
  );
};

export default Table;
