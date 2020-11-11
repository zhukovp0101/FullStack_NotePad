import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SimpleEditor from "../../SimpleEditor";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginBottom: "10px",
  },
  editor: {
    maxHeight: "40vh",
    overflowY: "auto",
  },
  heading: {
    "& div": {
      marginRight: "40px",
    },
    display: "flex",
    justifyContent: "center",
  },
  icon: {
    opacity: 0.2,
    "&:hover": {
      opacity: 0.8,
    },
  },
  accordion: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  accordionSummary: {
    backgroundColor: "rgba(0, 0, 0, 0.001)",
    "&:hover": {
      backgroundColor: "#fbf5fc",
    },
    borderBottom: "1px solid rgba(0, 0, 0, .03)",
  },
  text: {
    marginTop: '3px',
  }
});

const Note = ({ id, text, list, onRemove, onEdit }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          className={classes.accordionSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          id={id}
        >
          <div className={classes.heading}>
            <div>
              <IconButton
                className={classes.icon}
                aria-label="edit"
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  onEdit(list.id, { id, text });
                }}
                onFocus={(event) => event.stopPropagation()}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className={classes.icon}
                aria-label="delete"
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  onRemove(list.id, id);
                }}
                onFocus={(event) => event.stopPropagation()}
              >
                <DeleteIcon />
              </IconButton>
            </div>
            <div>
              <Typography className={classes.text}>{text}</Typography>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Container className={classes.editor}>
            <SimpleEditor />
          </Container>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Note;
