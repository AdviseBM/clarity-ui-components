const themes = {
  light: {
    name: "default",
    secondary: {
      background: "#fff",
      color: "#000",
    },
    table: {
      background: "#fff",
      border: "1px solid #ebebeb",
    },
    header: {
      background: "#fafafa",
      // borderBottom: 'solid 1px #ededed',
    },
    row: {},
    col: {
      background: "#fff",
    },
    colSecondary: {
      background: "#fafafa",
    },
    row: {
      background: "#fff",
    },
    rowHoverCol: {
      background: "#f0f7ff",
    },
    grid: {
      boxShadow: "inset 0px 0px 0 0.5px #ebebeb",
    },
    cell: {
      border: "1px solid #ebebeb",
    },
    selection: {
      background: "rgb(14, 101, 235, 0.1)",
      border: "1px solid #2196f3",
    },
    exludeArea: {
      background: "rgba(255, 255, 255, 0.7)",
    }
  },
  dark: {
    name: "dark",
    secondary: {
      background: "#202124",
      color: "#bdc6cf",
    },
    table: {
      border: "1px solid #ebebeb",
    },
    header: {
      background: "#000",
    },
    row: {
      background: "#202124",
    },
    col: {
      background: "#202124",
      color: "#bdc6cf",
    },
    rowHoverCol: {
      background: "#414245",
    },
    colSecondary: {
      background: "#202124",
      color: "#bdc6cf",
    },
    grid: {
      boxShadow: "inset 0px 0px 0 0.5px #4a4c50",
    },
    cell: {
      border: "1px solid #ebebeb",
    },
    selection: {
      background: "rgb(14, 101, 235, 0.1)",
      border: "1px solid #2196f3",
    },
    exludeArea: {
      background: "rgba(255, 255, 255, 0.1)",
    }
  },
};

export default themes;
