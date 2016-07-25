"use strict";

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

/*
   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/
var React = require("react");
var _ = require("underscore");
var ColumnProperties = require("./columnProperties.js");
var assign = require('lodash/assign');

var DefaultHeaderComponent = React.createClass({
 displayName: 'DefaultHeaderComponent',

 render: function render() {
   return React.createElement('span', null, this.props.displayName);
 }
});

var GridTitle = React.createClass({
  displayName: "GridTitle",
  getDefaultProps: function() {
    return {
      columnSettings: null,
      rowSettings: null,
      sortSettings: null,
      headerStyle: null,
      useGriddleStyles: true,
      useGriddleIcons: true,
      headerStyles: {}
    };
  },
  componentWillMount: function() {
    this.verifyProps();
  },
  sort: function(event) {
    this.props.sortSettings.changeSort(event.target.dataset.title ||
      event.target.parentElement.dataset.title);
  },
  verifyProps: function() {
    if (this.props.columnSettings === null) {
      console.error(
        "gridTitle: The columnSettings prop is null and it shouldn't be"
      );
    }

    if (this.props.sortSettings === null) {
      console.error(
        "gridTitle: The sortSettings prop is null and it shouldn't be");
    }
  },
  render: function() {
    this.verifyProps();
    var that = this;

    var nodes = this.props.columnSettings.getColumns().map(function(col,
      index) {
      var columnSort = "";
      var sortComponent = that.props.sortSettings.sortDefaultComponent;
      var titleStyles = null;

      if (that.props.sortSettings.sortColumn == col && that.props.sortSettings
        .sortAscending) {
        columnSort = that.props.sortSettings.sortAscendingClassName;
        sortComponent = that.props.useGriddleIcons && that.props.sortSettings
          .sortAscendingComponent;
      } else if (that.props.sortSettings.sortColumn == col && that.props
        .sortSettings.sortAscending === false) {
        columnSort += that.props.sortSettings.sortDescendingClassName;
        sortComponent = that.props.useGriddleIcons && that.props.sortSettings
          .sortDescendingComponent;
      }


      var meta = that.props.columnSettings.getColumnMetadataByName(
        col);
      var columnIsSortable = that.props.columnSettings.getMetadataColumnProperty(
        col, "sortable", true);
      var displayName = that.props.columnSettings.getMetadataColumnProperty(
        col, "displayName", col);
      var HeaderComponent = that.props.columnSettings.getMetadataColumnProperty(col, "customHeaderComponent", DefaultHeaderComponent);
      var headerProps = that.props.columnSettings.getMetadataColumnProperty(col, "customHeaderComponentProps", {});

      columnSort = meta == null ? columnSort : (columnSort &&
          columnSort + " " || columnSort) + that.props.columnSettings
        .getMetadataColumnProperty(col, "cssClassName", "");

      if (that.props.useGriddleStyles) {
        titleStyles = {
          backgroundColor: "#EDEDEF",
          border: "0",
          borderBottom: "1px solid #DDD",
          color: "#222",
          padding: "5px",
          cursor: columnIsSortable ? "pointer" : "default"
        };
      }

      // return React.createElement(
      //   "th", {
      //     onClick: columnIsSortable ? that.sort : null,
      //     "data-title": col,
      //     className: columnSort,
      //     key: index,
      //     style: titleStyles
      //   },
      //   displayName,
      //   sortComponent
      // );
      return React.createElement('th', { onClick: columnIsSortable ? that.sort : null, 'data-title': col, className: columnSort, key: col,
        style: titleStyles }, React.createElement(HeaderComponent, _extends({ columnName: col, displayName: displayName,
          filterByColumn: that.props.filterByColumn }, headerProps)), sortComponent);
    });

    //Get the row from the row settings.
    var className = that.props.rowSettings && that.props.rowSettings.getHeaderRowMetadataClass() ||
      null;


    // return React.createElement('thead', null, React.createElement('tr', {
    //   className: className,
    //   style: this.props.headerStyles }, nodes));

    return React.createElement('thead', null, React.createElement('tr', {
      className: className,
      style: this.props.headerStyles }, nodes));
  }
});

module.exports = GridTitle;
