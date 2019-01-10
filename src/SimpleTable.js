import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class Filter extends Component {
  state = {
    cookie: "",
    from: "",
    to: "",
    blocked: ""
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = () => {
    this.props.palletsFilter(this.state);
  }

  handleClear = () => {
    this.setState({
      cookie: "",
      from: "",
      to: "",
      blocked: ""
    });
    this.props.palletsFilter({});
  }

  render() {
    return (
      <div style={{paddingLeft: "10px", marginBottom: "10px"}}>
        <form>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-end">
            <TextField
              style={{minWidth: "140px"}}
              id="cookie"
              select
              label="Select Cookie"
              value={this.state.cookie}
              onChange={this.handleInputChange}
              name="cookie"
              SelectProps={{
                native: true
              }}>
              <option value=""></option>
              {this.props.cookies.map(c =>
                <option key={c.name} value={c.name}>{c.name}</option>
              )}
            </TextField>
            <TextField
              style={{marginLeft: "10px"}}
              id="from"
              label="From"
              type="date"
              value={this.state.from}
              onChange={this.handleInputChange}
              name="from"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{marginLeft: "10px"}}
              id="to"
              label="To"
              type="date"
              value={this.state.to}
              onChange={this.handleInputChange}
              name="to"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{marginLeft: "10px", minWidth: "90px"}}
              id="blocked"
              select
              label="Blocked?"
              value={this.state.blocked}
              onChange={this.handleInputChange}
              name="blocked"
              SelectProps={{
                native: true
              }}>
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </TextField>
            <Button
                style={{marginLeft: "10px"}}
                variant="contained"
                onClick={this.handleSubmit}>
              Filter Pallets
            </Button>
            <Button
                style={{marginLeft: "10px"}}
                variant="contained"
                onClick={this.handleClear}>
              Clear
            </Button>
          </Grid>
        </form>
      </div>
    );
  }
}


function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Filter
        cookies={props.cookies}
        palletsFilter={props.palletsFilter}/>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Production date</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Blocked</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.pallets.map(p => {
            const customer = !p.customer || p.customer == 'null' ? '' : p.customer;
            return (
              <TableRow key={p.id}>
                <TableCell component="th" scope="row">
                  {p.cookie}
                </TableCell>
                <TableCell>{p.production_date}</TableCell>
                <TableCell>{customer}</TableCell>
                <TableCell>{p.blocked}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
