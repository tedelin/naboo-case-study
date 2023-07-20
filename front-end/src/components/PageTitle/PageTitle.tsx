import { ActionIcon, Group } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

interface PageTitleProps {
  title: string;
  prevPath?: string;
}

export function PageTitle({ title, prevPath }: PageTitleProps) {
  return prevPath ? (
    <Group mt="md" mb="xs">
      <Link href={prevPath}>
        <ActionIcon>
          <IconArrowLeft size="1.125rem" />
        </ActionIcon>
      </Link>
      <h2>{title}</h2>
    </Group>
  ) : (
    <h2>{title}</h2>
  );
}
