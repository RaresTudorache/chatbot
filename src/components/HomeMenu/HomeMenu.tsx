import { Button, Stack } from "@mui/material";

export type HomeMenuProps = {
  onSelectExchange: (exchangeCode: string) => void;
};

const HomeMenu = ({ onSelectExchange }: HomeMenuProps) => {
  return (
    <Stack spacing={2}>
      <Button variant="contained" onClick={() => onSelectExchange("LSE")}>
        London Stock Exchange (LSE)
      </Button>
      <Button variant="contained" onClick={() => onSelectExchange("NYSE")}>
        New York Stock Exchange (NYSE)
      </Button>
      <Button variant="contained" onClick={() => onSelectExchange("NASDAQ")}>
        NASDAQ
      </Button>
    </Stack>
  );
};

export default HomeMenu;
