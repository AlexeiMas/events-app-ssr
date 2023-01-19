import styles from "../../../styles/Home.module.css";
import {Paper, Typography} from "@mui/material";

export const Footer = () => {
  return (
    <Paper
      variant={"outlined"}
      component={"footer"}
      square
      className={styles.footer}
    >
      <Typography variant={"subtitle1"} component={"p"}> © {(new Date()).getFullYear()} Developed by Alex M.</Typography>
    </Paper>
  )
}