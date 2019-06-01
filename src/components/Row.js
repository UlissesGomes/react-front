import React from "react";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const Row = ({ order }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <TableRow key={order.numberOrder}>
        <TableCell component="th" scope="row">
          {order.numberOrder}
        </TableCell>
        <TableCell align="right">{`R$ ${order.totalOrder}`}</TableCell>
      </TableRow>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <h1>teste</h1>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

export default Row;
