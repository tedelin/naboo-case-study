import { useAuth } from "@/hooks";
import { SignInInput } from "@/utils";
import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { emailValidation, passwordValidation } from "./validationRules";

export default function SigninForm() {
  const { handleSignin, isLoading } = useAuth();
  const form = useForm<SignInInput>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: emailValidation,
      password: passwordValidation,
    },
  });

  return (
    <Box maw={450} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSignin(values))}>
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
        <Group position="right" mt="md">
          <Button loading={isLoading} type="submit">
            Valider
          </Button>
        </Group>
      </form>
    </Box>
  );
}
