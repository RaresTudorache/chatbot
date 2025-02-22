import { Button, Typography, Stack, IconButton, Tooltip } from "@mui/material";
import { Stock } from "../../types/types";
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type StockDetailsProps = {
  stock: Stock;
  onBack: () => void;
};

const StockDetails = ({ stock, onBack }: StockDetailsProps) => {
  const [copyTooltip, setCopyTooltip] = useState("Copy to clipboard");

  const handleCopyPrice = async () => {
    await navigator.clipboard.writeText(`$${stock.price.toFixed(2)}`);
    setCopyTooltip("Copied!");
    setTimeout(() => setCopyTooltip("Copy to clipboard"), 2000);
  };
  return (
    <Stack
      spacing={3}
      maxWidth="100%"
      alignItems="center"
      sx={{
        padding: 4,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 600,
          textAlign: "center",
          width: "100%",
        }}
      >
        {stock.stockName}
      </Typography>

      <Stack
        sx={{
          background: "linear-gradient(135deg, #6B8DD6 0%, #8E37D7 100%)",
          borderRadius: 2,
          padding: 3,
          width: "100%",
          position: "relative",
          overflow: "hidden",
          transform: "translateZ(0)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%)",
            backgroundSize: "350% 350%",
            animation: "shimmer 3s ease infinite",
          },
        }}
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 700,
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            position: "relative",
            zIndex: 2,
          }}
        >
          ${stock.price.toFixed(2)}
        </Typography>
        <Tooltip
          title={copyTooltip}
          sx={
            {
              // zIndex: 10000,
            }
          }
        >
          <IconButton
            onClick={handleCopyPrice}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
            size="small"
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      <Button
        variant="contained"
        color="secondary"
        onClick={onBack}
        sx={{
          textTransform: "none",
          minWidth: "90%",
          borderRadius: 2,
          padding: "10px 24px",
          fontSize: "1.1rem",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 10px rgba(0,0,0,0.15)",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        Back
      </Button>
    </Stack>
  );
};

export default StockDetails;
