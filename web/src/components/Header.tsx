import React from "react"
import {Link as RouterLink} from "react-router-dom"
import {AppBar, Link, Toolbar} from "@material-ui/core"

export function Header(): JSX.Element {
  return (
    <AppBar
      color="secondary"
      position="fixed"
      style={{boxShadow: "0px 2px 10px 1px #100d0d0d"}}
    >
      <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
        <Link component={RouterLink} to="/">
          {"🌿"}
        </Link>
        <nav>
          <Link component={RouterLink} to="/">
            {"Plants"}
          </Link>
          <Link
            component={RouterLink}
            style={{marginLeft: "20px"}}
            to="/add-plant"
          >
            {"Add Plant"}
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  )
}
