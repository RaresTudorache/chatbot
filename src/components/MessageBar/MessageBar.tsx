import { Paper } from "@mui/material";
import { ChatItem } from "../../types/types";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../theme/theme";

const MessageBar = ({ type, content }: ChatItem) => {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: "0.8rem 1.2rem",
        borderRadius: "12px",
        backgroundColor: type === "user" ? PRIMARY_COLOR : SECONDARY_COLOR,
        color: "white",
        maxWidth: "70%",
        alignSelf: type === "user" ? "flex-end" : "flex-start",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          bottom: "8px",
          [type === "user" ? "right" : "left"]: "-8px",
          width: "20px",
          height: "20px",
          backgroundColor: "inherit",
          clipPath:
            type === "user"
              ? "polygon(100% 0, 0 0, 100% 100%)"
              : "polygon(0 0, 100% 0, 0 100%)",
        },
      }}
    >
      {content}
    </Paper>
  );
};

export default MessageBar;
