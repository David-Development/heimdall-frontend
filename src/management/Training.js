import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';

import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'

import HTTPClient from '../HTTPClient'


const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'classifier_type', numeric: false, disablePadding: false, label: 'Classifier' },
  { id: 'loaded', numeric: false, disablePadding: false, label: 'Aktiv' },
  { id: 'cv_score', numeric: true, disablePadding: false, label: 'Cross-Val-Score' },
  { id: 'num_classes', numeric: true, disablePadding: false, label: 'Personen' },
  { id: 'total_images', numeric: true, disablePadding: false, label: 'Total Images' },
  { id: 'total_no_faces', numeric: true, disablePadding: false, label: 'Images without face' },
  { id: 'training_time', numeric: true, disablePadding: false, label: 'Training time (seconds)' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' }
];



const styles = theme => ({
  root: {
    //width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  buttonStartTraining: {
    marginLeft: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
});




class Training extends React.Component {

  state = {
    order: 'desc',
    orderBy: 'id',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 10,
  };

  componentDidMount() {
    HTTPClient.fetchModels()
      .then(models => {
        console.log(models);
        this.setState({ data: models });
      })
      .catch(error => {
        console.log(error);
        this.setState({ data: [] });
      });
  }
  

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };
  
  handleBla= () => {
    const { data } = this.state;
    let currentlyLoadedModel = data.find(model => model.loaded === true);

    // Unload model
    currentlyLoadedModel.loaded = false; // TODO make web request
  }
  
  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  trainClick = () => {
    HTTPClient.startTraining()
      .then(console.log)
      .catch(console.log);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  convertDate(date) {
    return new Date(Date.parse(date)).toLocaleString();
  }

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              columnData={columnData}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                //console.log(n);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    onKeyDown={event => this.handleKeyDown(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell padding="none">{n.name}</TableCell>
                    <TableCell text="true">{n.classifier_type}</TableCell>
                    <TableCell text="true">{n.loaded ? "Ja" : "Nein"}</TableCell>
                    <TableCell numeric>{Number.parseFloat(n.cv_score).toPrecision(2)}</TableCell>
                    <TableCell numeric>{n.num_classes}</TableCell>
                    <TableCell numeric>{n.total_images}</TableCell>
                    <TableCell numeric>{n.total_no_faces}</TableCell>
                    <TableCell numeric>{n.training_time}</TableCell>
                    <TableCell text="true">{this.convertDate(n.date)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <Button raised className={classes.buttonStartTraining} onClick={this.trainClick}>Training starten</Button>
      </Paper>
    );
  }
}

Training.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Training);