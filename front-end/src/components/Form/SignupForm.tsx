import { useAuth } from "@/hooks";
import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function SignupForm() {
  const { handleSignup, isLoading } = useAuth();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Box maw={450} mx="auto">
      <form
        onSubmit={form.onSubmit((values) =>
          handleSignup(
            values["email"],
            values["password"],
            values["firstName"],
            values["lastName"]
          )
        )}
      >
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="Mot de passe"
          placeholder="*****"
          type="password"
          {...form.getInputProps("password")}
        />
        <TextInput
          withAsterisk
          label="First name"
          placeholder="John"
          {...form.getInputProps("firstName")}
        />
        <TextInput
          withAsterisk
          label="Last name"
          placeholder="Doe"
          {...form.getInputProps("lastName")}
        />
        <Group position="right" mt="md">
          <Button loading={isLoading} type="submit">
            Valider
          </Button>
        </Group>
      </form>
    </Box>
  );
}
