import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Breadcrumb",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { BreadcrumbBasic as Basic } from "compositions/examples/breadcrumb-basic"
export { BreadcrumbWithEllipsis as WithEllipsis } from "compositions/examples/breadcrumb-with-ellipsis"
export { BreadcrumbWithIcon as WithIcon } from "compositions/examples/breadcrumb-with-icon"
export { BreadcrumbWithMenu as WithMenu } from "compositions/examples/breadcrumb-with-menu"
export { BreadcrumbWithSeparator as WithSeparator } from "compositions/examples/breadcrumb-with-separator"
export { BreadcrumbVariantTable as Variants } from "compositions/examples/breadcrumb-variant-table"
export { BreadcrumbSizeTable as Sizes } from "compositions/examples/breadcrumb-size-table"
