import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DataGuessLogo from "./DataGuess.svg";
import { Stack } from "@mui/material";
export default function MyHeader() {
  return (
    <AppBar sx={{ backgroundColor: "#ffffff" }} position="sticky">
      <Toolbar
        sx={{
          height: 70,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ alignSelf: "center", marginLeft: "32px" }}>
          <img src={DataGuessLogo} width={200} />
        </Stack>

        <IconButton sx={{ alignSelf: "center" }}>
          <svg
            preserveAspectRatio="xMidYMid meet"
            data-bbox="20 50.5 160.001 99.001"
            viewBox="20 50.5 160.001 99.001"
            height="40"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
            data-type="shape"
            role="presentation"
            aria-hidden="true"
            aria-label=""
          >
            <g>
              <path d="M31.428 72.856h137.144c6.186.124 11.301-4.779 11.426-10.952s-4.789-11.278-10.974-11.402c-.15-.003-.301-.003-.451 0H31.428c-6.186-.124-11.301 4.779-11.426 10.952s4.789 11.278 10.974 11.402c.151.003.302.003.452 0z"></path>
              <path d="M168.572 127.144H31.428c-6.186-.124-11.301 4.779-11.426 10.952s4.789 11.278 10.974 11.402c.15.003.301.003.451 0h137.144c6.186.124 11.301-4.779 11.426-10.952s-4.789-11.278-10.974-11.402c-.15-.003-.301-.003-.451 0z"></path>
              <path d="M168.572 88.823H31.428c-6.186-.124-11.301 4.779-11.426 10.952s4.789 11.278 10.974 11.402c.15.003.301.003.451 0h137.144c6.186.124 11.301-4.779 11.426-10.952s-4.789-11.278-10.974-11.402c-.15-.003-.301-.003-.451 0z"></path>
            </g>
          </svg>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
