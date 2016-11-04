import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default ({orderItems}) => {
    console.log(orderItems)
  return (
    	<Table>
            <TableHeader>
            <TableRow>
                <TableHeaderColumn>image</TableHeaderColumn>
                <TableHeaderColumn>Item</TableHeaderColumn>
                <TableHeaderColumn>Quantity</TableHeaderColumn>
                <TableHeaderColumn>Price</TableHeaderColumn>
                <TableHeaderColumn>xbutton</TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableRowColumn>img</TableRowColumn>
                    <TableRowColumn>Good Chair</TableRowColumn>
                    <TableRowColumn>1</TableRowColumn>
                    <TableRowColumn>$10</TableRowColumn>
                    <TableRowColumn>x</TableRowColumn>
                </TableRow>
                {
                    orderItems && orderItems.map(item => {
                        <TableRow>
                            <TableRowColumn><img src='img' /></TableRowColumn>
                            <TableRowColumn>{item.name}</TableRowColumn>
                            <TableRowColumn>{item.quantity}</TableRowColumn>
                            <TableRowColumn>{item.price}</TableRowColumn>
                            <TableRowColumn><button class="removeItem">x</button></TableRowColumn>
                        </TableRow>
                    })
                    
                }
            </TableBody>
        </Table>
  	)
  };