import { useState, useEffect, ChangeEvent } from "react";
import DataCard from "./core/Card";
import "./App.css";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import MyHeader from "./core/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export type Country = {
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  languages: Language[];
  continent: Continent;
};

export type Language = {
  code: string;
  name: string;
};

export type Continent = {
  name: string;
};

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>("");
  const [group, setGroup] = useState<string>("");

  const [selectedCards, setSelectedCards] = useState<Country[]>([]);
  useEffect(() => {
    fetch("https://countries.trevorblades.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            countries {
              name
              native
              capital
              emoji
              currency
              languages {
                code
                name
              }
              continent {
                name
              }
            }
          }
        `,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network Error");
        }
        return response.json();
      })
      .then((data) => setCountries(data.data.countries))
      .catch((error) => console.error("API Error:", error));
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleGroupChange = (e: SelectChangeEvent<string>) => {
    setGroup(e.target.value);
  };

  const error = () =>
    toast.error("A selected card cannot be selected again!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const success = () =>
    toast.success("Card added successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const warning = () =>
    toast.warn("You can add up to 12 cards", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const filteredCountries = countries
    .filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
    )
    .reduce((grouped, country) => {
      let key = "All Countries";
      if (group === "continent" && country.continent) {
        key = country.continent.name;
      } else if (group === "languages" && country.languages.length > 0) {
        key = country.languages.map((lang) => lang.name).join(", ");
      } else if (group && typeof country[group as keyof Country] === "string") {
        key = country[group as keyof Country] as string;
      }

      if (!grouped[key as keyof Language]) {
        grouped[key as keyof Language] = [];
      }
      grouped[key as keyof Language].push(country);
      return grouped;
    }, {} as { [key: string]: Country[] });

  const handleCountrySelect = (country: Country) => {
    if (selectedCards.length < 12 && !selectedCards.includes(country)) {
      setSelectedCards([...selectedCards, country]);
      success();
    } else if (selectedCards.length === 12) {
      warning();
    } else error();
  };

  return (
    <div className="App">
      <MyHeader />

      <ToastContainer />

      <Stack
        width={"100dvw"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        gap={16}
        paddingTop={4}
        paddingBottom={4}
      >
        <TextField
          color="error"
          type="text"
          label="Search by name"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearchChange}
        />

        <Box sx={{ minWidth: 120 }}>
          <FormControl color={"error"} sx={{ minWidth: 120 }}>
            <InputLabel id="group-select-label">Group</InputLabel>
            <Select
              labelId="group-select-label"
              id="group-select"
              value={group}
              label="Group by..."
              onChange={handleGroupChange}
            >
              <MenuItem value={""}>
                <i>none</i>
              </MenuItem>
              <MenuItem value={"currency"}>currency</MenuItem>
              <MenuItem value={"continent"}>continent</MenuItem>
              <MenuItem value={"languages"}>languages</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {selectedCards.length > 0 && (
          <Button
            onClick={() => setSelectedCards([])}
            color="error"
            variant="contained"
          >
            Delete All Cards
          </Button>
        )}
      </Stack>

      {selectedCards ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "center",
          }}
        >
          {selectedCards.map((country: Country, index) => (
            <DataCard
              selectedColor={index + 1}
              country={country}
              index={index + 1}
              label={country.name}
              clickAction={function (country: Country): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
        </div>
      ) : (
        <p>Select a Country...</p>
      )}

      {Object.entries(filteredCountries).map(([group, countryList], index) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            justifyContent: "center",
          }}
          key={index}
        >
          <h3>{group}</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "center",
            }}
          >
            {" "}
            {countryList.map((country: Country, index) => (
              <DataCard
                index={index + 1}
                selectedCountryList={selectedCards}
                clickAction={handleCountrySelect}
                country={country}
                label={country.name}
                key={index}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
