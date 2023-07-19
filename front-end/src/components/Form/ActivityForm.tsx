import { useDebounced, useSnackbar } from "@/hooks";
import { searchCity } from "@/services";
import { ActivityInput } from "@/utils";
import { Box, Button, Group, Select, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import {
  cityValidation,
  descriptionValidation,
  nameValidation,
  priceValidation,
} from "./validationRules";

interface ActivityFormFields {
  name: string;
  city: string;
  description: string;
  price: number;
}

type SelectData = {
  value: string;
  label: string;
};

export default function ActivityForm() {
  const snackbar = useSnackbar();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounced(searchValue, 300);
  const [displayedCities, setDisplayedCities] = useState<SelectData[]>([]);

  const form = useForm<ActivityFormFields>({
    initialValues: {
      name: "",
      description: "",
      city: "",
      price: 0,
    },
    validate: {
      name: nameValidation,
      description: descriptionValidation,
      city: cityValidation,
      price: priceValidation,
    },
  });

  useEffect(() => {
    if (debouncedSearch) {
      searchCity(debouncedSearch)
        .then((data) => {
          setDisplayedCities(
            data.map((d) => ({ value: d.code, label: d.nom }))
          );
        })
        .catch((err) => {
          snackbar.error(err?.message || "Une erreur est survenue");
        });
    }
  }, [debouncedSearch, snackbar]);

  const handleSubmit = (values: ActivityFormFields) => {
    const targetCity = displayedCities.find((c) => c.value === values.city);

    if (targetCity) {
      const input: ActivityInput = {
        name: values.name,
        description: values.description,
        city: {
          name: targetCity.label,
          postalCode: targetCity.value,
        },
        price: values.price,
      };

      console.log(input);
    }
  };

  return (
    <Box maw={450} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Nom de l'activité"
          placeholder="Session Yoga"
          {...form.getInputProps("name")}
        />
        <Textarea
          withAsterisk
          label="Description"
          placeholder="Description de l'activité"
          {...form.getInputProps("description")}
        />
        <Select
          withAsterisk
          label="Localisation"
          placeholder="Rouen"
          searchable
          onSearchChange={setSearchValue}
          searchValue={searchValue}
          data={displayedCities}
          {...form.getInputProps("city")}
        />
        <TextInput
          withAsterisk
          label="Prix"
          placeholder="50"
          type="number"
          {...form.getInputProps("price")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Valider</Button>
        </Group>
      </form>
    </Box>
  );
}
