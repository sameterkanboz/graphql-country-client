import { Card, CardContent, Typography } from "@mui/material";
import { Country } from "~/App";

const DataCard = ({
  clickAction,
  country,
  index,
  selectedColor,
  selectedCountryList,
}: {
  selectedColor?: number;
  index: number;
  selectedCountryList?: Country[];
  label: string;
  country: Country;
  clickAction: (country: Country) => void;
}) => {
  const cardColors = [
    "#FEECED",
    "#FDD8DB",
    "#FCC5CA",
    "#FBC6CA",
    "#FBB1B8",

    "#F8A0A7",
    "#F57A84",
    "#F25461",
    "#EF2E3E",
    "#E41123",
    "#BE0E1D",
    "#980B17",
    "#720811",
  ];
  console.log(selectedCountryList);
  return (
    <Card
      sx={{
        cursor: "pointer",
        width: 250,
        height: 250,
        backgroundColor: selectedColor ? cardColors[selectedColor] : "white",
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
      onClick={() => clickAction(country)}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ alignSelf: "start" }}>{index}</Typography>
        <Typography>{country.emoji}</Typography>
        <Typography>{country.name}</Typography>
        <Typography>{country.continent.name}</Typography>

        <Typography>{country.capital}</Typography>
        <Typography>{country.currency}</Typography>
        {country.languages.map((language, index) => {
          return (
            <Typography fontSize={12} key={index}>
              {language.name}
            </Typography>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default DataCard;
