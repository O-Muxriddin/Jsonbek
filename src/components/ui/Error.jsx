import { For, Stack, VStack, Box } from "@chakra-ui/react"
import { LuBox } from "react-icons/lu"


const Error = () => {
  return (
    <Stack gap="4">
      <For
        each={[]}
        fallback={
          <VStack textAlign="center" fontWeight="medium">
            <LuBox />
            No items to show
          </VStack>
        }
      >
        {(item, index) => (
          <Box h="10" key={index}>
            {item}
          </Box>
        )}
      </For>
    </Stack>
  )
}
export default Error
