import React from 'react'
import { RaisedButton } from 'material-ui'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { roundPrice } from '../../utils'

export default ({cartProducts}) => {
    console.log(cartProducts[0])
  return (
    <div id="cart" className="col-xs-12">
    	<h1>this is cart</h1>
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
                {
                    cartProducts && cartProducts.map(item => {
                        return (
                        <TableRow key={item.id}>
                            <TableRowColumn><img src={item.product.images[0]} alt="" /></TableRowColumn>
                            <TableRowColumn>{item.product.name}</TableRowColumn>
                            <TableRowColumn>{item.quantity}</TableRowColumn>
                            <TableRowColumn>{roundPrice(item.product.price)}</TableRowColumn>
                            <TableRowColumn>
                                <button className="removeItem">x</button>
                            </TableRowColumn>
                        </TableRow>
                        )
                    })
                    
                }
            </TableBody>
        </Table>
        <div id="purchasebutton">
            <button>Buy!</button>
        </div>
    </div>

  	)
  };
