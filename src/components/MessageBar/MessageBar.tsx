import { Paper } from "@mui/material";
import { UserType } from "../../types/types";
import { PRIMARY_COLOR, LIGHT_GREY } from "../../theme/theme";
import { ReactNode } from "react";

type MessageBarProps = {
  type: UserType;
  content: string | ReactNode;
};

const MessageBar = ({ type, content }: MessageBarProps) => {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: "0.8rem 1.2rem",
        borderRadius: "12px",
        backgroundColor: type === UserType.USER ? PRIMARY_COLOR : LIGHT_GREY,
        color: type === UserType.USER ? "white" : "black",
        maxWidth: "50%",
        alignSelf: type === UserType.USER ? "flex-end" : "flex-start",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          bottom: "8px",
          [type === UserType.USER ? "right" : "left"]: "-8px",
          width: "20px",
          height: "20px",
          clipPath:
            type === UserType.USER
              ? "path('M 100 0 Q 50 0 100 100')"
              : "path('M 0 0 Q 50 0 0 100')",
        },
      }}
    >
      {content}
    </Paper>
  );
};

export default MessageBar;
