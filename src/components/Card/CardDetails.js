import React from "react";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CardHeader from "./CardHeader";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { useStyles } from "../../assets/jss/CardDetailsStyle";

export default function CardDetails({
  title,
  color,
  list,
  children,
  visibility,
}) {
  const [visible, setVisible] = React.useState(visibility);
  let listItems = null;

  const classes = useStyles();
  const input = makeStyles((theme) => ({
    cssLabel: {
      color: color,
    },
    notchedOutline: {
      borderWidth: ".5px",
      borderColor: color,
    },
  }));

  const inputStyle = input();

  if (list) {
    listItems = list.map((obj) => (
      <Grid
        key={obj.label}
        xs={12}
        sm={12}
        md={obj.size}
        item
        style={{ padding: "8px 16px" }}
      >
        <FormControl fullWidth>
          <TextField
            defaultValue={obj.value}
            label={obj.label}
            variant="outlined"
            multiline
            InputLabelProps={{
              classes: {
                root: inputStyle.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            inputProps={{ readOnly: true }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: inputStyle.notchedOutline,
              },
            }}
          />
        </FormControl>
      </Grid>
    ));
  }
  return (
    <Paper style={{ height: "100%", padding: "16px", marginBottom: "16px" }}>
      {title && (
        <CardHeader title={title} color={color} visibility>
          {visibility && (
            <IconButton
              aria-label="visibilé"
              onClick={() => setVisible(!visible)}
            >
              {visible ? (
                <VisibilityIcon
                  style={{ color: "white", border: ".5px solid #efefef" }}
                />
              ) : (
                <VisibilityOffIcon style={{ color: "white" }} />
              )}
            </IconButton>
          )}
        </CardHeader>
      )}
      {visible && (
        <div>
          <div style={{ marginTop: "16px", padding: "0 30px" }}>{children}</div>
          <Grid
            container
            justify="space-between"
            style={{ marginTop: "16px", padding: "0" }}
          >
            {listItems}
          </Grid>
        </div>
      )}
    </Paper>
  );
}
