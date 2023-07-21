import { Flex, NumberInput, TextInput } from "@mantine/core";
import { IconCurrencyEuro, IconWalk } from "@tabler/icons-react";

export function Filters() {
  return (
    <Flex
      gap="md"
      direction="column"
      sx={(tm) => ({
        width: "100%",
        borderRadius: tm.radius.md,
        backgroundColor: tm.colors.gray[2],
        padding: tm.spacing.md,
      })}
    >
      <TextInput icon={<IconWalk />} placeholder="Activité" />
      <NumberInput icon={<IconCurrencyEuro />} placeholder="< Prix" />
    </Flex>
  );
}
