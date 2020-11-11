import React, { useState, useRef } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import styled from "@emotion/styled";
import IconButton from "@material-ui/core/IconButton";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import FormatBold from "@material-ui/icons/FormatBold";
import FormatItalic from "@material-ui/icons/FormatItalic";
import FormatTitle from "@material-ui/icons/FormatSize";
import FormatUnderlined from "@material-ui/icons/FormatUnderlined";
import FormatColor from "@material-ui/icons/Palette";
import './SimpleEditor.css'; 
const HANDLED = "handled",
  NOT_HANDLED = "not-handled";

function NavButton({ children, onClick }) {
  return (
    <IconButton
      onClick={onClick}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {children}
    </IconButton>
  );
}

const RTEContainer = styled.div`
  border: 1px solid #f2f2f2;
  padding: 1em;
  cursor: text;
`;

const ColorsContainer = styled.div`
  background: white;
  font-size: 14px;
  border-radius: 3px;
  box-shadow: 0px 4px 8px 0px rgba(33, 33, 33, 0.3);
`;
const Palette = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 150px;
  margin-right: 1em;
`;
const ColorDrop = styled.div`
  display: inline-block;
  padding: 1em;
  margin: 1em;
  margin-right: 0;
  height: 0.5em;
  width: 0.5em;
  border-radius: 3px;
  cursor: pointer;
  ${({ color }) => {
    if (typeof color === "string") color = color.toUpperCase();
    if (customStyleMap[color]) {
      return `background: ${customStyleMap[color].color};`;
    } else {
      return `display: none;`;
    }
  }}
`;
const NavBar = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const NavDivider = styled.div`
  width: 1px;
  background: #f2f2f2;
  min-height: 1em;
  margin: 0.5em 0.5em;
  display: inline-block;
`;

const customStyleMap = {
  RED: {
    color: "var(--editor-red)",
  },
  ORANGE: {
    color: "var(--editor-orange)",
  },
  YELLOW: {
    color: "var(--editor-yellow)",
  },
  GREEN: {
    color: "var(--editor-green)",
  },
  BLUE: {
    color: "var(--editor-blue)",
  },
  PURPLE: {
    color: "var(--editor-purple)",
  },
  BLACK: {
    color: "var(--editor-black)",
  },
  GRAY: {
    color: "var(--editor-gray)",
  },
  WHITE: {
    color: "var(--editor-white)",
  },
  TITLE: {
    fontSize: "1.5em",
  },
};

export default function SimpleEditor(props) {
  const rte = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (editorState) => {
      setEditorState(editorState);
      // props.onChange(convertToRaw(editorState.getCurrentContent()));
    };
  const handleKeyCommand = (command) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        onChange(newState);
        return HANDLED;
      }
      return NOT_HANDLED;
    };
  const setStyle = (style) => {
      onChange(RichUtils.toggleInlineStyle(editorState, style));
    };

  const onUnderlineClick = () =>
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  const onBoldClick = () =>
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  const onItalicClick = () => setStyle("ITALIC");
  const onColorClick = (color) => {
    setStyle(color.toUpperCase());
    setAnchorEl(null);
  };
  const onTitleClick = () => setStyle("TITLE");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <NavBar>
        <NavButton onClick={onTitleClick}>
          <FormatTitle />
        </NavButton>
        <NavDivider />
        <NavButton onClick={onBoldClick}>
          <FormatBold />
        </NavButton>
        <NavButton onClick={onItalicClick}>
          <FormatItalic />
        </NavButton>
        <NavButton onClick={onUnderlineClick}>
          <FormatUnderlined />
        </NavButton>
        <NavDivider />
        <NavButton aria-describedby={id} onClick={handleClick}>
          <FormatColor />
        </NavButton>

        <Popper id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
          <ClickAwayListener onClickAway={handleClose}>
            <ColorsContainer>
              <Palette>
                {[
                  "red",
                  "orange",
                  "yellow",
                  "green",
                  "blue",
                  "purple",
                  "black",
                  "gray",
                  "white",
                ].map((color) => (
                  <ColorDrop
                    key={color}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    onClick={(e) => {
                      onColorClick(color);
                    }}
                    color={color}
                  />
                ))}
              </Palette>
            </ColorsContainer>
          </ClickAwayListener>
        </Popper>
      </NavBar>
      <RTEContainer
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          rte.current.editor.focus();
        }}
      >
        <Editor
          ref={rte}
          {...{ editorState, onChange, handleKeyCommand, customStyleMap}}
        />
      </RTEContainer>
    </>
  );
}
